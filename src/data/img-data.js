const clothesImages = [
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816033/scott-shop/womens-tshirt-01_klhq1a.jpg",
    unsplahSrc: "https://unsplash.com/photos/VW5VjskNXZ8",
    cat: "t-shirt",
    by: "Christian Bolt",
    profile: "https://unsplash.com/@christianbolt",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648610470/scott-shop/mens-jumper-01_jmulqi.jpg",
    unsplahSrc: "https://unsplash.com/photos/VhAGYvpINUM",
    cat: "jumper",
    by: "Christian Bolt",
    profile: "https://unsplash.com/@christianbolt",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816033/scott-shop/womens-tshirt-02_ns2yre.jpg",
    unsplahSrc: "https://unsplash.com/photos/IrQmtib-ER4",
    cat: "t-shirt",
    by: "Budka Damdinsuren",
    profile: "https://unsplash.com/@buudkaanaa",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816034/scott-shop/mens-tshirt-01_kkyatb.jpg",
    unsplahSrc: "https://unsplash.com/photos/NMYG69BG_Jg",
    cat: "t-shirt",
    by: "Meysam Jarahkar",
    profile: "https://unsplash.com/@arona",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816035/scott-shop/womens-tshirt-03_kcwxyk.jpg",
    unsplahSrc: "https://unsplash.com/photos/aP8KhiHbSvo",
    cat: "t-shirt",
    by: "Good Faces",
    profile: "https://unsplash.com/@goodfacesagency",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816034/scott-shop/mens-tshirt-02_lzutnh.jpg",
    unsplahSrc: "https://unsplash.com/photos/s27B05TjXxw",
    cat: "t-shirt",
    by: "Sahil Moosa",
    profile: "https://unsplash.com/@sahilkv_",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648816033/scott-shop/mens-tshirt-03_rbeygs.jpg",
    unsplahSrc: "https://unsplash.com/photos/A0mSSCEVh9A",
    cat: "t-shirt",
    by: "Marlon Alves",
    profile: "https://unsplash.com/@marlonalvesphoto",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648612289/scott-shop/womens-jumper-01_irnswx.jpg",
    unsplahSrc: "https://unsplash.com/photos/QE0BJHGskDo",
    cat: "jumper",
    by: "Nick Karvounis",
    profile: "https://unsplash.com/@nickkarvounis",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648612486/scott-shop/womens-jumper-02_lp3d5m.jpg",
    unsplahSrc: "https://unsplash.com/photos/9kja1Ry3VX4",
    cat: "jumper",
    by: "Brooke Cagle",
    profile: "https://unsplash.com/@brookecagle",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648612677/scott-shop/mens-jumper-02_hmh84m.jpg",
    unsplahSrc: "https://unsplash.com/photos/QY3MlQzMKOU",
    cat: "jumper",
    by: "Oliver Ragfelt",
    profile: "https://unsplash.com/@oliverragfelt",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648618755/scott-shop/womens-jeans-01_rrxn69.jpg",
    unsplahSrc: "https://unsplash.com/photos/2s3GhhJz2uY",
    cat: "jeans",
    by: "Kai Gabriel",
    profile: "https://unsplash.com/@kaigabriel42",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648619929/scott-shop/womens-jeans-02_ptzgku.jpg",
    unsplahSrc: "https://unsplash.com/photos/j-vpjNZwnBE",
    cat: "jeans",
    by: "Jasmin Chew",
    profile: "https://unsplash.com/@majestical_jasmin",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648620110/scott-shop/mens-jeans-01_pfuv9p.jpg",
    unsplahSrc: "https://unsplash.com/photos/d54wbtjedog",
    cat: "jeans",
    by: "Mohamad Khosravi",
    profile: "https://unsplash.com/@mohamadkhosravi",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648620466/scott-shop/mens-jeans-02_bujr8c.jpg",
    unsplahSrc: "https://unsplash.com/photos/h6jgQaBNIyA",
    cat: "jeans",
    by: "Christopher Ivanov",
    profile: "https://unsplash.com/@christopher_ivanov",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648621044/scott-shop/womens-shorts-01_wmssz4.jpg",
    unsplahSrc: "https://unsplash.com/photos/jKMdDvs1Kdw",
    cat: "shorts",
    by: "Andrei Koscina",
    profile: "https://unsplash.com/@andreikoscina",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648621309/scott-shop/womens-shorts-02_syaphr.jpg",
    unsplahSrc: "https://unsplash.com/photos/p_RLioHjZVI",
    cat: "shorts",
    by: "Alonso Reyes",
    profile: "https://unsplash.com/@alonsoreyes",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1649725561/scott-shop/mens-shorts-01_k6rhzm.jpg",
    unsplahSrc: "https://unsplash.com/photos/A_xuGH5aSuc",
    cat: "shorts",
    by: "Philip Myrtorp",
    profile: "https://unsplash.com/@philipmyr",
  },
  {
    image:
      "https://res.cloudinary.com/scott-cloud/image/upload/v1648621928/scott-shop/mens-shorts-02_ydpiza.jpg",
    unsplahSrc: "https://unsplash.com/photos/f8TGdaZ2Zrw",
    cat: "shorts",
    by: "Brock Wegner",
    profile: "https://unsplash.com/@isthatbrock",
  },
];

const otherImages = [
  {
    image: "/img/background.jpg",
    unsplahSrc: "https://unsplash.com/photos/tvG4WvjgsEY",
    by: "Parker Burchfield",
    profile: "https://unsplash.com/@parkerburchfield",
  },
  {
    image: "/img/customer-support.jpg",
    unsplahSrc: "https://unsplash.com/photos/QckxruozjRg",
    by: "Annie Sprat",
    profile: "https://unsplash.com/@anniespratt",
  },
  {
    image: "/img/delivery.jpg",
    unsplahSrc: "https://unsplash.com/photos/BFdSCxmqvYc",
    by: "RoseBox",
    profile: "https://unsplash.com/@rosebox",
  },
  {
    image: "/img/sustainable.jpg",
    unsplahSrc: "https://unsplash.com/photos/x8ZStukS2PM",
    by: "Noah Buscher",
    profile: "https://unsplash.com/@noahbuscher",
  },
  {
    image: "/img/trends.jpg",
    unsplahSrc: "https://unsplash.com/photos/_3Q3tsJ01nc",
    by: "freestocks",
    profile: "https://unsplash.com/@freestocks",
  },
  {
    image: "/img/contact-us.jpg",
    unsplahSrc: "https://unsplash.com/photos/x8ZStukS2PM",
    by: "Miles Burke",
    profile: "https://unsplash.com/@milesb",
  },
];

export { clothesImages, otherImages };
