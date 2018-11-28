import Plugin from "broccoli-plugin";
import { Packager, PackagerInstance } from "./packager";
import App from "./app";
import PackageCache from "./package-cache";

interface BroccoliPackager<Options> {
  new(app: App, options?: Options): Plugin;
}

export default function toBroccoliPlugin<Options>(packagerClass: Packager<Options>): BroccoliPackager<Options> {
  class PackagerRunner extends Plugin {
    private packager: PackagerInstance | undefined;
    constructor(private app: App, private options?: Options) {
      super([app.tree], {
        persistentOutput: true,
        needsCache: false
      });
    }

    async build() {
      if (!this.packager) {
        let { root, packageCache } = await this.app.ready();
        if (!packageCache) {
          // apps are allowed to share a package cache as an optimization, but
          // they aren't required to. Whereas Packages are allowed to assume
          // they will receive a packageCache instance.
          packageCache = new PackageCache();
        }
        this.packager = new packagerClass(
          root,
          this.outputPath,
          (msg) => console.log(msg),
          packageCache,
          this.options,
        );
      }
      return this.packager.build();
    }
  }
  return PackagerRunner;
}
