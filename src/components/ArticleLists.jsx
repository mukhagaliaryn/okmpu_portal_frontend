import { useRouter } from 'next/router';
import React from 'react';
import { BACKEND_URL } from '../actions/types';

const ArticleList = ({articles, access}) => {
  const router = useRouter();

  const deleteArticle = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/article/${id}`, {
          method: "DELETE",
          headers: {
              "Authorization": `JWT ${access}`
          },
      })
      router.push(`/`);
    } catch(e) {
        console.log(e);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Тақырыбы
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Бағыты
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Статус
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Импорт
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article, i) => {
                    const date = new Date(article.date_created)
                    return (
                      <tr key={i}>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-900 line-clamp-3" title={article.title}>{article.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-3" title={article.title_subdir}>{article.title_subdir}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-900 line-clamp-2">{article.direction}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{article.sub_direction}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-center text-gray-500">{`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}ж`}</div>
                          <span className="px-2 text-center inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            @{article.owner.username}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <a href={article.files} className="text-indigo-600 hover:text-indigo-900">
                              Жүктеу
                          </a>
                          <span onClick={() => deleteArticle(article.id)} className="block cursor-pointer text-red-800 text-right pt-1">Жою</span>
                        </td>
                      </tr>
                    )
                  }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


  

export default ArticleList;