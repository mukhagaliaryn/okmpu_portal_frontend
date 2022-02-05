import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../layout";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from '../actions/types';
import { useState } from "react";


const DIR_CHOICES = [
  {
    key: "UNDEFINED", 
    value: "Белгісіз",
    sub_choices: []
  },
  {
    key: "ACADEMY", 
    value: "Академиялық бағыт",
    ACADEMY: [
      {key: "UNDEFINED", value: "Белгісіз"},
      {key: "ACADEMY FIRST", value: "Оқулықтар, оқу-құралдары, оқу-әдістемелік құралдар"},
      {key: "ACADEMY SECOND", value: "Цифрлық ресурстар"},
      {key: "ACADEMY THIRD", value: "Оқытушы –профессор құрамының академиялық ұтқырлық бағдарламасы бойынша дәрістер оқуы"},
      {key: "ACADEMY FOURTH", value: "Тілдік курстар (IELTS, TOEFL IBT, CELTA)"},
      {key: "ACADEMY FIVETH", value: "Оқытушы–профессор құрамының біліктілігін арттыру"},
      {key: "ACADEMY SIXTH", value: "Кеңестер мен комиссиялардың жұмысына қатысу"},
    ]
  },
  {
    key: "INNOVATION", 
    value: "Ғылыми бағыт",
    INNOVATION: [
      {key: "UNDEFINED", value: "Белгісіз"},
      {key: "INN FIRST", value: "Республикалық, халықаралақ жобалар"},
      {key: "INN SECOND", value: "Жарияланымдар"},
      {key: "INN THIRD", value: "Clarivate Analytics, Scopus мақалалар"},
      {key: "INN FOURTH", value: "Әлемдік рейтингтік базалардағы Хирш (h) индексі"},
      {key: "INN FIVETH", value: "Ғылыми басылымдар мен журналдарда мақалалар жариялау"},
      {key: "INN SIXTH", value: "Конференция материалдарының жинағындағы мақалалардың жариялануы"},
      {key: "INN SEVENTH", value: "Конференция материалдарының жинағындағы мақалалардың жариялануы"},
      {key: "INN SIXTH", value: "Конференция материалдарының жинағындағы мақалалардың жариялануы"},
      {key: "INN SEVENTH", value: "Ғылыми конференцияларда және пәндік олимпиадаларда жүлделі орын алған студенттердің жетекшілік, Халықаралық және ұлттық деңгейде нәтижеге жеткен өнер саңлақтары мен спортшыларға жетекшілік"},
      {key: "INN EIGHTH", value: "Патенттер және алдыңғы патенттер,иновациялық патенттер, авторлық туындылар (өнертабыстарды), зияткерлік меншік обьектісінің мемлекеттік тіркелуінің болуы"},
      {key: "INN NINETH", value: "Жетістіктер мен марапаттар"},
      {key: "INN TENTH", value: "Ғылыми атақ алу  (ҚР БҒМ, БҒСБК-ККСОН диплом алған жағдайда)"},
    ]
  },
  {
    key: "EDU", 
    value: "Тәрбие және рухани жаңғыру бағыты",
    EDU: [
      {key: "UNDEFINED", value: "Белгісіз"},
      {key: "EDU FIRST", value: "Факультет бойынша сала жауаптылар"},
      {key: "EDU SECOND", value: "Ғылыми атақ алу  (ҚР БҒМ, БҒСБК-ККСОН диплом алған жағдайда)"},
      {key: "EDU THIRD", value: "ОҚМПУ имиджін көтеру, білім, тәрбие саласында бұқаралық ақпарат құралдарында жарияланған материалдар"},
      {key: "EDU FOURTH", value: "«Рухани жаңғыру» бағдарламасы аясында атқарылған іс-шаралар"},
      {key: "EDU FIVETH", value: "«Рухани жаңғыру» бағдарламасын ілгерілету үшін жобалар, бағдарламалар дайындау (қаржыландырылатын немесе жеке бастама)"},
      {key: "EDU SIXTH", value: "«Қазақстандағы 100 жаңа есім»  жобасының жеңімпаздары"},
    ]
  },
  {
    key: "FOR_CAFEDRA", 
    value: "Кафедра үшін",
    FOR_CAFEDRA: [
      {key: "UNDEFINED", value: "Белгісіз"},
      {key: "CAF FIRST", value: "Реестрге тіркелген білім беру бағдарламалары"},
      {key: "CAF SECOND", value: "Университетті бітірушілердің жұмысқа орналасу деңгейі"},
      {key: "CAF THIRD", value: "Шет елдерден келіп университетте дәріс беріп қайтқан оқытушы-профессорлар"},
      {key: "CAF FOURTH", value: "Ғылыми дәрежелі оқытушы-профессорлардың жалпы үлесі"},
      {key: "CAF FIVETH", value: "Білім беру бағдарламалары бойынша рейтингте алғашқы үштікке кірген БББ (рейтингке кемінде 1-5 ЖББҰ қатысқан жағдайда)"},
    ]
  },
]


export default function Article({access}) {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const { register, handleSubmit } = useForm();

    const [files, setFiles] = useState(null);
    const [selected, setSelect] = useState(null);

    const handleChange = e => {
      if ([e.target.name].toString() === 'files') {
        setFiles(e.target.files);
      }
    }

    const selectChange = e => {
      setSelect(e.target.value)
    }
    
    const saveArticle = async (data) => {
        const formData = new FormData();
        files && formData.append('files', files[0]);
        formData.append('title', data.title);
        formData.append('direction', data.direction)
        formData.append('sub_direction', data.sub_direction)


        try {
            await fetch(`${BACKEND_URL}/article/`, {
                method: "POST",
                headers: {
                    "Authorization": `JWT ${access}`
                },
                body: formData
            })
            router.push(`/`);

        } catch(e) {
            console.log(e);
        }
    }

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }
    
    return (
      <Layout>
        {isAuthenticated && (user !== null && user.status !=="Студент") ?
        <>
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
                <form onSubmit={handleSubmit(saveArticle)}>
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
                              {...register("title")}
                              id="title"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-2"
                              placeholder="Атауын жазу"
                              required
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
                            <select {...register('direction')} onChange={e => selectChange(e)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-2" required>
                              {DIR_CHOICES.map((item, i) => (
                                    <option key={i} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                          </div>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select {...register('sub_direction')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-2" required>
                              {DIR_CHOICES.map((item) => {
                                return (
                                  item[selected] && item[selected].map((sub, i) => (
                                    <option key={i} value={sub.key}>{sub.value}</option>
                                  ))
                                )
                              })}
                            </select>
                          </div>
                        </div>
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
                                <input type="file" {...register("files")} onChange={handleChange} className="sr-only" id="file-upload" required/>
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
        </>: <h1 className="text-center mt-20 text-xl font-bold">Администрациялық бөлімге жүгініңіз!</h1>}
      </Layout>
    )
}

export async function getServerSideProps(context) {
  const access = context.req.cookies.access ?? false
    if (!access) {
        return {
            props: {
                profile: null,
                access: null
            },
        }
    } 

  return {
      props: {
        access
      }
  }
}