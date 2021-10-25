namespace ProxyPattern {
  interface Image {
    showImage?: () => void;
  }

  class RealImage implements Image {
    private url: string;
    constructor(url: string) {
      this.url = url;
      console.log('Image loaded: ', this.url);
    }

    showImage() {
      console.log('Image showed: ', this.url);
    }
  }

  class ProxyImage implements Image {
    private url: string;
    private realImage: any = null;

    constructor(url: string) {
      this.url = url;
      console.log('Image unloaded: ', this.url);
    }

    showImage() {
      if (this.realImage == null) {
        this.realImage = new RealImage(this.url);
      } else {
        console.log('Image already existed');
      }
      this.realImage.showImage();
    }
  }

  function main() {
    console.log('Init proxy image');
    const proxyImage = new ProxyImage('https://www.google.com/image');

    console.log('---');
    console.log('Call real service 1st: ');
    proxyImage.showImage();

    console.log('---');
    console.log('Call real service 2nd: ');
    proxyImage.showImage();
  }

  main();
}
