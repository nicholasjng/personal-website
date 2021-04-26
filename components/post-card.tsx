import Author from "../types/author";

type Props = {
    title: string
    section: string
    description: string
    author: Author
}

export default function PostCard({ props: Props }) {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
      <a href="#" className="w-full block h-full">
        <img
          alt="blog photo"
          src="/images/blog/1.jpg"
          className="max-h-40 w-full object-cover"
        />
        <div className="bg-white dark:bg-gray-800 w-full p-4">
          <p className="text-indigo-500 text-md font-medium">Article</p>
          <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
            Supercharged !
          </p>
          <p className="text-gray-400 dark:text-gray-300 font-light text-md">
            The new supercar is here, 543 cv and 140 000$. This is best racing
            GT about 7 years on...
          </p>
          <div className="flex items-center mt-4">
            <a href="#" className="block relative">
              <img
                alt="profil"
                src="/images/person/6.jpg"
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">Jean Jacques</p>
              <p className="text-gray-400 dark:text-gray-300">
                20 mars 2029 - 6 min read
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
