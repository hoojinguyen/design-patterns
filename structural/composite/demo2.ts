namespace CompositePattern {
  interface FileComponent {
    showProperty: () => void;
    totalSize: () => number;
  }

  class FileLeaf implements FileComponent {
    private name: string;
    private size: number;

    constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
    }

    totalSize = () => {
      return this.size;
    };

    showProperty = () => {
      console.log('FileLeaf [name=' + this.name + ', size=' + this.size + ']');
    };
  }

  class FolderComposite implements FileComponent {
    private files: FileComponent[] = [];

    constructor(files: FileComponent[]) {
      this.files = files;
    }

    showProperty = () => {
      for (const file of this.files) {
        file.showProperty();
      }
    };

    totalSize = () => {
      let total = 0;
      for (const file of this.files) {
        total += file.totalSize();
      }
      return total;
    };
  }

  function main() {
    const file1 = new FileLeaf('file 1', 10);
    const file2 = new FileLeaf('file 2', 5);
    const file3 = new FileLeaf('file 3', 12);
    const files = [file1, file2, file3];
    const folder = new FolderComposite(files);
    folder.showProperty();
    console.log('Total size: ', folder.totalSize());
  }

  main();
}
