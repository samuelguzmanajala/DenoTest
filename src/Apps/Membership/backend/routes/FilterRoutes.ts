import * as path from "path/mod.ts";
interface FilterOptions {
  extension?: string;
}
export async function getFilesList(
  directory: string,
  options: FilterOptions = {},
): Promise<string[]> {
  const foundFiles: string[] = [];
  for await (const fileOrderFolder of Deno.readDir(directory)) {
    if (fileOrderFolder.isDirectory) {
      const nestedFiles = await getFilesList(
        path.join(directory, fileOrderFolder.name),
        options,
      );
      foundFiles.push(...nestedFiles);
    } else {
      const completePath = (path.join(directory, fileOrderFolder.name));
      if (options.extension) {
        if (completePath.endsWith(options.extension)) {
          foundFiles.push(path.join(completePath));
        }
      }
    }
  }
  return foundFiles;
}
