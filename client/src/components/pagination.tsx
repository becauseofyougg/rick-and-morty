import React, { useState } from 'react'

const Pagination = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage] = useState(5);
    const [pagesCount, setPagesCount] = useState(null)

    // const getData = async () => {
    //     const res  = await axios.get("https://rickandmortyapi.com/api/character//?page=42")
    //     console.log(res.data)         
    //     await setPosts(res.data.results)           
    //     await setPagesCount(res.data.info.pages)
    // }
    
    // useEffect(() => {
    //     try {
    //         getData()
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }, []);
    
      const firstText = currentPage * postPerPage;
      const indexText = firstText - postPerPage;
      const CurrentPost = posts.slice(indexText, firstText);
    
      const paginate = (postNumber) => setcurrentPage(postNumber);
      
  return (
    <nav aria-label="Page-navigation">
        <ul className="inline-flex -space-x-px">
            <li>
                <a href="" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
            <a href="#" aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
  )
}
export default Pagination;