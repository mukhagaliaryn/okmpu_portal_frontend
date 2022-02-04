import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../layout";

export default function Article() {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }
    
    return (
      <Layout>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Интикативтік жоспарды жүктеу беті</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Бұл ақпараттар өздерінің бағыттары бойынша кафедраларға, факультеттерге және ректораттарға жіберіледі.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          Интикативтік жоспардың тақырыбы
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                            placeholder="Атауын жазу"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          Профессорлік-оқытушылар құрамының индикативтік жоспары 
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <select name="" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-1">
                            <option value="">Академиялық бағыт</option>
                            <option value="">Ғылыми бағыт</option>
                            <option value="">Тәрбие және рухани жаңғыру бағыты</option>
                          </select>
                        </div>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <select name="" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-1">
                            <option value="">Оқулықтар, оқу-құралдары, оқу-әдістемелік құралдар</option>
                            <option value="">Цифрлық ресурстар</option>
                            <option value="">Оқытушы –профессор құрамының   академиялық ұтқырлық бағдарламасы бойынша  дәрістер оқуы</option>
                            <option value="">Тілдік курстар (IELTS, TOEFL IBT, CELTA)</option>
                          </select>
                        </div>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <select name="" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-1">
                            <option value="">ҚР БжҒМ грифімен шығатын</option>
                            <option value="">Республикалық оқу-әдістемелік кеңестер шешімімен шыққан </option>
                            <option value="">ОҚМПУ-нің ғылыми кеңесі және оқу-әдістемелік кеңесі шешімімен шығарылған</option>
                            <option value="">ОҚМПУ-нің  оқу-әдістемелік кеңесі шешімімен шығарылған  </option>
                            <option value="">Онлайн курстар</option>
                            <option value="">Бейне лекция (1 пән үшін толық қамтылған)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Интикативтік жоспар жайлы
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-2 py-1"
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Интикативтік жоспардың қысқаша сипаттамасы. 
                        URL мекенжайлары сілтемелермен жабдықталған.
                      </p>
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Файлды жүктеу</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Файлды жүктеу</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">немесе сүйреңіз</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF 10 МБ дейін</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Сақтау
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </Layout>
    )
}