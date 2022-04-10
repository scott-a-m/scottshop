import React from "react";
import { clothesImages, otherImages } from "../data/img-data";

const Credits = () => {
  return (
    <div className="text-center mt-20 text-md px-5">
      <div className="py-4">
        <h1 className="font-heading text-4xl">Credits</h1>
        <div className="h-[2px] bg-green-200 w-1/4 m-[0_auto]"></div>
      </div>
      <p className="text-lg">
        This is to give credit to all the photographers for their images from{" "}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Unsplash
        </a>
        .
      </p>
      <div>
        <h1 className="text-3xl font-heading py-4">Clothes Images</h1>
        <div>
          <h1 className="font-heading text-2xl py-2">T-shirts</h1>
          <ul className="flex justify-center">
            {clothesImages
              .filter((item) => item.cat === "t-shirt")
              .map((item, index) => {
                const { by, profile } = item;
                return (
                  <li className="list-none" key={index}>
                    <a
                      href={profile}
                      target="_blank"
                      rel="noreferrer"
                      className="px-1 link"
                    >
                      {by},
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h1 className="font-heading text-2xl py-2">Jumpers:</h1>
          <ul className="flex justify-center">
            {clothesImages
              .filter((item) => item.cat === "jumper")
              .map((item, index) => {
                const { by, profile } = item;
                return (
                  <li className="list-none" key={index}>
                    <a
                      href={profile}
                      target="_blank"
                      rel="noreferrer"
                      className="px-1 link"
                    >
                      {by},
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h1 className="font-heading text-2xl py-2">Shorts</h1>
          <ul className="flex justify-center">
            {clothesImages
              .filter((item) => item.cat === "shorts")
              .map((item, index) => {
                const { by, profile } = item;
                return (
                  <li className="list-none" key={index}>
                    <a
                      href={profile}
                      target="_blank"
                      rel="noreferrer"
                      className="px-1 link"
                    >
                      {by},
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h1 className="font-heading text-2xl py-2">Jeans</h1>
          <ul className="flex justify-center">
            {clothesImages
              .filter((item) => item.cat === "jeans")
              .map((item, index) => {
                const { by, profile } = item;
                return (
                  <li className="list-none" key={index}>
                    <a
                      href={profile}
                      target="_blank"
                      rel="noreferrer"
                      className="px-1 link"
                    >
                      {by},
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <h1 className="text-3xl font-heading py-6">Other Images</h1>
        <div>
          <ul className="flex justify-center">
            {otherImages.map((item, index) => {
              const { by, profile } = item;
              return (
                <li className="list-none" key={index}>
                  <a
                    href={profile}
                    target="_blank"
                    rel="noreferrer"
                    className="px-1 link"
                  >
                    {by},
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Credits;
