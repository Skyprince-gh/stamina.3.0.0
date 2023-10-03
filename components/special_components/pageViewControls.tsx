import { collection, getDocs } from "firebase/firestore";
import { db } from "../../util/firebase";
import { useEffect, useState } from "react";

export const PageViewControls: React.FC<{pageNumber:number;
  loadPageList: (pageNumber: number) => void;
}> = ({ loadPageList, pageNumber }) => {
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // getCollectionSize(collectionPath).then((size) => {
    //   setPages(Math.floor(size / 25));
    // });
    setPages(20);
  }, []);

  return (
    <div className="fixed bottom-4 bg-primary-black p-4 text-white rounded-xl flex">
      {Array(pages)
        .fill(0)
        .map((item, index: number) => (
          <span
            onClick={(e) => loadPageList(index + 1)}
            key={index}
            className={`px-2 w-6 mx-1 flex justify-center ${index + 1 === pageNumber? "text-primary-yellow font-bold": ""} hover:text-primary-yellow active:text-primary-yellow active:bg-white`}
          >
            {index + 1}
          </span>
        ))}
    </div>
  );
};

export default PageViewControls;
