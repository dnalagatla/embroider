import { Tree } from "broccoli-plugin";
import PackageCache from "./package-cache";

export default interface App {
  // this is the broccoli tree that must get built for the app to be ready. But!
  // This tree's output path is _not_ necessarily where the final app will be,
  // for that you must look at `root`.
  readonly tree: Tree;

  // this promise is only guaranteed to resolve if you cause `tree` to be
  // included in a broccoli build.
  ready(): Promise<{
    // This is the actual directory in which the app will be.
    readonly root: string;

    // This optionally allows the App to share its PackageCache with the following
    // build stage, as an optimization.
    readonly packageCache?: PackageCache;
  }>;
}
