function SearchBar({searchText,handleChangeText}) {
    return (
      <div className="flex justify-center mr-5 my-2 ">
        <div className="relative w-9/12">
          <input
            type="search"
            className="block w-full p-4 text-sm text-gray-900 border-2 border-gray-300  bg-gray-50"
            placeholder="Search"
            required=""
            value={searchText}
            onChange={(e)=>handleChangeText(e.target.value)}
          />
        </div>
        <div className="py-1 px-1">
          <button
            type="submit"
            className="h-12 text-white hover:bg-gray-200  px-2 py-2 border-2  bg-gray-50"
          >
            <svg
              className="w-5 h-5 text-red-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <div className=""></div>
        </div>
      </div>
    );
  }
  

  export {SearchBar};