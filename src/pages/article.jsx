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
      {
        key: "UNDEFINED", 
        value: "Белгісіз",
      },
      {
        key: "ACADEMY_FIRST", 
        value: "Оқулықтар, оқу-құралдары, оқу-әдістемелік құралдар",
        ACADEMY_FIRST: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "ҚР БжҒМ грифімен шығатын"
          },
          {
            key: "ACADEMY_FIRST_SECOND",
            value: "Республикалық оқу-әдістемелік кеңестер шешімімен шыққан"
          },
          {
            key: "ACADEMY_FIRST_THIRD",
            value: "ОҚМПУ-нің ғылыми кеңесі және оқу-әдістемелік кеңесі шешімімен шығарылған"
          },
          {
            key: "ACADEMY_FIRST_FOURHTH",
            value: "ОҚМПУ-нің  оқу-әдістемелік кеңесі шешімімен шығарылған"
          },
        ]
      },
      {
        key: "ACADEMY_SECOND", 
        value: "Цифрлық ресурстар",
        ACADEMY_SECOND: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "Онлайн курстар (МООК платформасына енгізу, Университет платформасына енгізу)"
          },
          {
            key: "ACADEMY_FIRST_SECOND",
            value: "Бейне лекция (1 пән үшін толық қамтылған)"
          },
          {
            key: "ACADEMY_FIRST_THIRD",
            value: "Электронды оқулық, оқу құралы"
          },
        ]
      },
      {
        key: "ACADEMY_THIRD", 
        value: "Оқытушы –профессор құрамының академиялық ұтқырлық бағдарламасы бойынша дәрістер оқуы",
        ACADEMY_THIRD: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "Академиялық ұтқырлық бағдарламасы бойынша ОПҚ –ның  шетелдік ЖОО-да дәріс оқуы"
          },
          {
            key: "ACADEMY_FIRST_SECOND",
            value: "Академиялық ұтқырлық бағдарламасы бойынша ОПҚ –ның   ҚР ЖОО-да дәріс оқуы"
          },
        ]
      },
      {
        key: "ACADEMY_FOURTH", 
        value: "Тілдік курстар (IELTS, TOEFL IBT, CELTA)",
        ACADEMY_FOURTH: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "- 6,0 баллдан жоғары"
          },
          {
            key: "ACADEMY_FIRST_SECOND",
            value: "- TOEFL IBT (173-196)"
          },
          {
            key: "ACADEMY_FIRST_THIRD",
            value: "CELTA профильдік кафедра үшін"
          },
        ]
      },
      {
        key: "ACADEMY_FIVETH", 
        value: "Оқытушы–профессор құрамының біліктілігін арттыру",
        ACADEMY_FIVETH: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "Кемінде 72 сағат пәндік біліктілікті арттырудан өту сертификаттары (екеуден артық емес)"
          },
          {
            key: "ACADEMY_FIRST_SECOND",
            value: "Coursera, EdX, Udacity, FutureLearn  онлайн курстары платформалары базасында ағымдық  жылдағы кәсіби қызметі бойынша шет тіліндегі жаппай ашық онлайн курстар платформасы базасы бойынша оқудан өту сертификаттары (толық курс аяқталған жағдайда)"
          },
        ]
      },
      {
        key: "ACADEMY_SIXTH", 
        value: "Кеңестер мен комиссиялардың жұмысына қатысу",
        ACADEMY_SIXTH: [
          {
            key: "ACADEMY_FIRST_FIRST",
            value: "ҚР БҒжМ бұйрығымен бекітілген: сараптық топ мүшелері, РОӘК мүшесі, Республикалық, облыстық ресми жұмыс тобының мүшелері"
          },
        ]
      },
    ]
  },
  {
    key: "INNOVATION", 
    value: "Ғылыми бағыт",
    INNOVATION: [
      {
        key: "UNDEFINED", 
        value: "Белгісіз",
      },
      {
        key: "INN_FIRST", 
        value: "Республикалық, халықаралақ жобалар",
        INN_FIRST: [
          {
            key: "INN_FIRST_FIRST", 
            value: "ERASMUS+, HORIZON, т.б. жетекшілік жасау,орындаушысы.",
          },
          {
            key: "INN_FIRST_SECOND", 
            value: "ҚР БжҒМ ҒК бағдарламалық-нысаналы қаржыландыру бойынша жобаларға: жетекшілік жасау, орындаушысы.",
          },
          {
            key: "INN_FIRST_THIRD", 
            value: "ҚР БжҒМ ҒК гранттық қаржыландыру бойынша жобаларға: жетекшілік жасау, орындаушысы.",
          },
          {
            key: "INN_FIRST_FOURTH", 
            value: "Стартап жобаларға: жетекшілік жасау, орындаушысы.",
          },
          {
            key: "INN_FIRST_FIVETH", 
            value: "Оқу процесіне ғылыми-зерттеу немесе инновациялық жұмыстардың нәтижелерін енгізу (жоба нәтижелері, монография  және РОӘК оқулық)",
          },
        ]
      },
      {
        key: "INN_SECOND", 
        value: "Жарияланымдар",
        INN_SECOND: [
          {
            key: "INN_SECOND_FIRST", 
            value: "Clarivate Analytics, Scopus базаларындағы кітаптар, монографиялар, кітап тараулары",
          },
          {
            key: "INN_SECOND_SECOND", 
            value: "Монографиялар ОҚМПУ-нің ғылыми кеңесі шешімімен бекітілген",
          },
        ]
      },
      {
        key: "INN_THIRD", 
        value: "Clarivate Analytics, Scopus мақалалар",
        INN_THIRD: [
          {
            key: "INN_THIRD_FIRST", 
            value: "1 Quartile (Квартиль)  (процентиль 99-76%)",
          },
          {
            key: "INN_THIRD_SECOND", 
            value: "2 Quartile (Квартиль)  (процентиль 75-51%)",
          },
          {
            key: "INN_THIRD_THIRD", 
            value: "3 Quartile (Квартиль) (процентиль 50-25%)",
          },
          {
            key: "INN_THIRD_FOURTH", 
            value: "4 Quartile (Квартиль) (процентиль 24-1%)",
          },
        ]
      },
      {
        key: "INN_FOURTH", 
        value: "Әлемдік рейтингтік базалардағы Хирш (h) индексі",
        INN_FOURTH: [
          {
            key: "INN_FOURTH_FIRST", 
            value: "Хирш индексінің болуы: h≥3  тең немесе кем емес, h<3  дейін",
          },
        ]
      },
      {
        key: "INN_FIVETH", 
        value: "Ғылыми басылымдар мен журналдарда мақалалар жариялау",
        INN_FIVETH: [
          {
            key: "INN_FIVETH_FIRST", 
            value: "ҚР БжҒМ Комитеті  ұсынған  тізім бойынша отандық  басылымдар",
          },
          {
            key: "INN_FIVETH_SECOND",
            value: "«ОҚМПУ Хабаршысы»",
          },
        ]
      },
      {
        key: "INN_SIXTH", 
        value: "Конференция материалдарының жинағындағы мақалалардың жариялануы",
        INN_SIXTH: [
          {
            key: "INN_SIXTH_FIRST", 
            value: "Clarivate Analytics және Scopus базаларында индекстелетін конференция материалдар",
          },
          {
            key: "INN_SIXTH_SECOND", 
            value: "Халықаралық, республикалық конференциялар (үшеуден артық емес)",
          },
        ]
      },
      {
        key: "INN_SEVENTH",
        value: "Ғылыми конференцияларда және пәндік олимпиадаларда жүлделі орын алған студенттердің жетекшілік, Халықаралық және ұлттық деңгейде нәтижеге жеткен өнер саңлақтары мен спортшыларға жетекшілік (ҚР салалық министрлігімен бекітілген ресми тізімі бойынша)",
        INN_SEVENTH: [
          {
            key: "INN_SEVENTH_FIRST",
            value: "Халықаралық",
          },
          {
            key: "INN_SEVENTH_SECOND", 
            value: "Республикалық",
          },
          {
            key: "INN_SEVENTH_THIRD", 
            value: "Олимпиада жүлдегері (спорттық)",
          },
          {
            key: "INN_SEVENTH_FOURTH", 
            value: "Облыстық  (екеуден артық емес)",
          },
        ]
      },
      {
        key: "INN_EIGHTH", 
        value: "Патенттер және алдыңғы патенттер,иновациялық патенттер, авторлық туындылар (өнертабыстарды), зияткерлік меншік обьектісінің мемлекеттік тіркелуінің болуы",
        INN_EIGHTH: [
          {
            key: "INN_EIGHTH_FIRST",
            value: "PCT жүйесі бойынша халықаралық патент (Patent Cooperation Treaty)"
          },
          {
            key: "INN_EIGHTH_SECOND",
            value: "Еуразиялық патент (ТМД елдері деңгейінде тіркелген)"
          },
          {
            key: "INN_EIGHTH_THIRD",
            value: "Республикалық патент"
          },
          {
            key: "INN_EIGHTH_FOURTH",
            value: "Авторлық куәлігі"
          },
        ]
      },
      {
        key: "INN_NINETH", 
        value: "Жетістіктер мен марапаттар",
        INN_NINETH: [
          {
            key: "INN_NINETH_FIRST",
            value: "Мемлекеттік сыйлықтар, стипендиялар"
          },
          {
            key: "INN_NINETH_SECOND",
            value: "Мемлекеттік төсбелгілер"
          },
          {
            key: "INN_NINETH_THIRD",
            value: "ҚР «ЖОО Үздік оқытушысы», «Үздік ғалым»  байқауының жеңімпазы"
          },
        ]
      },
      {
        key: "INN_TENTH", 
        value: "Ғылыми атақ алу  (ҚР БҒМ, БҒСБК-ККСОН диплом алған жағдайда)",
        INN_TENTH: [
          {
            key: "INN_TENTH_FIRST",
            value: "Ұлттық  Ғылым академиясы: Академик"
          },
          {
            key: "INN_TENTH_SECOND",
            value: "Ұлттық  Ғылым академиясы: корреспондент-мүшесі"
          },
          {
            key: "INN_TENTH_THIRD",
            value: "Профессор"
          },
          {
            key: "INN_TENTH_FOURTH",
            value: "Қауымдастырылған профессор (доцент)"
          },
          {
            key: "INN_TENTH_FIVETH",
            value: "Clarivate Analytics және Scopus базасындағы журналдарда редакция алқасының құрамында болуы"
          },
          {
            key: "INN_TENTH_SIXTH",
            value: "РһD доктор жетекшілік (қорғап, бекітілген жағдайда)"
          },
        ]
      },
    ]
  },

  {
    key: "EDU", 
    value: "Тәрбие және рухани жаңғыру бағыты",
    EDU: [
      {
        key: "UNDEFINED", 
        value: "Белгісіз",
      },
      {
        key: "EDU_FIRST", 
        value: "Факультет бойынша сала жауаптылар (Оқу-әдістемелік жұмыс, ҒЗЖ және СҒЗЖ, Кәсіптік бағдар жұмыстары, Практика бойынша, СМЖ, Халықаралық қатынастар бойынша, аға куратор, куратор және т.б.)",
        EDU_FIRST: [
          {
            key: "EDU_FIRST_FIRST",
            value: "Факультет бойынша сала жауаптылар (Оқу-әдістемелік жұмыс, ҒЗЖ және СҒЗЖ, Кәсіптік бағдар жұмыстары, Практика бойынша, СМЖ, Халықаралық қатынастар бойынша, аға куратор, куратор және т.б.)"
          },
        ]
      },
      {
        key: "EDU_SECOND", 
        value: "Ғылыми атақ алу  (ҚР БҒМ, БҒСБК-ККСОН диплом алған жағдайда)",
        EDU_SECOND: [
          {
            key: "EDU_SECOND_FIRST",
            value: "Халықаралық БАҚ, әлеуметтік желілердегі жарияланымдар"
          },
          {
            key: "EDU_SECOND_SECOND",
            value: "Республикалық, облыстық, қалалық  БАҚ, әлеуметтік желілердегі жарияланымдар"
          },
        ]
      },
      {
        key: "EDU_THIRD",
        value: "ОҚМПУ имиджін көтеру, білім, тәрбие саласында бұқаралық ақпарат құралдарында жарияланған материалдар",
        EDU_THIRD: [
          {
            key: "EDU_THIRD_FIRST",
            value: "Халықаралық"
          },
          {
            key: "EDU_THIRD_SECOND",
            value: "Республикалық"
          },
          {
            key: "EDU_THIRD_SECOND",
            value: "Республикалық"
          },
        ]
      },
      {
        key: "EDU_FOURTH",
        value: "«Рухани жаңғыру» бағдарламасы аясында атқарылған іс-шаралар",
        EDU_FOURTH: [
          {
            key: "EDU_FOURTH_FIRST",
            value: "Ғылыми жетекші"
          },
          {
            key: "EDU_FOURTH_SECOND",
            value: "Жауапты орындаушы"
          },
        ]
      },
      {
        key: "EDU_FIVETH", 
        value: "«Рухани жаңғыру» бағдарламасын ілгерілету үшін жобалар, бағдарламалар дайындау (қаржыландырылатын немесе жеке бастама)",
        EDU_FIVETH: [
          {
            key: "EDU_FIVETH_FIRST",
            value: "Қазақстанның 100 жаңа есімі"
          },
        ]
      },
      {
        key: "EDU_SIXTH", 
        value: "«Қазақстандағы 100 жаңа есім»  жобасының жеңімпаздары",
        EDU_FIVETH: [
          {
            key: "EDU_SIXTH_FIRST",
            value: "Қазақстанның 100 жаңа есімі"
          },
        ]
      },
    ]
  },
  {
    key: "FOR_CAFEDRA",
    value: "Кафедра үшін",
    FOR_CAFEDRA: [
      {
        key: "UNDEFINED", 
        value: "Белгісіз",
      },
      {
        key: "CAF_FIRST",
        value: "Реестрге тіркелген білім беру бағдарламалары",
        CAF_FIRST: [
          {
            key: "CAF_FIRST_FIRST",
            value: "Инновациялық БББ"
          },
          {
            key: "CAF_FIRST_SECOND",
            value: "Бірлескен БББ"
          },
          {
            key: "CAF_FIRST_THIRD",
            value: "Қосдипломды"
          },
        ]
      },
      {
        key: "CAF_SECOND",
        value: "Университетті бітірушілердің жұмысқа орналасу деңгейі",
        CAF_SECOND: [
          {
            key: "CAF_SECOND_FIRST",
            value: "70-80 % аралығында"
          },
          {
            key: "CAF_SECOND_SECOND",
            value: "81-90 % аралығында"
          },
          {
            key: "CAF_SECOND_THIRD",
            value: "90% -дан  жоғары"
          },
        ]
      },
      {
        key: "CAF_THIRD", 
        value: "Шет елдерден келіп университетте дәріс беріп қайтқан оқытушы-профессорлар",
        CAF_THIRD: [
          {
            key: "CAF_THIRD_FIRST",
            value: "Шет елдерден келіп университетте дәріс беріп қайтқан оқытушы-профессорлар"
          },
        ]
      },
      {
        key: "CAF_FOURTH", 
        value: "Ғылыми дәрежелі оқытушы-профессорлардың жалпы үлесі",
        CAF_FOURTH: [
          {
            key: "CAF_FOURTH_FIRST",
            value: "50-55 аралығында"
          },
          {
            key: "CAF_FOURTH_SECOND",
            value: "56-75 аралығында"
          },
          {
            key: "CAF_FOURTH_THIRD",
            value: "75-тен жоғары"
          },
        ]
      },
      {
        key: "CAF_FIVETH", 
        value: "Білім беру бағдарламалары бойынша рейтингте алғашқы үштікке кірген БББ (рейтингке кемінде 1-5 ЖББҰ қатысқан жағдайда)",
        CAF_FOURTH: [
          {
            key: "CAF_FIVETH_FIRST",
            value: "Білім беру бағдарламалары бойынша рейтингте алғашқы үштікке кірген БББ (рейтингке кемінде 1-5 ЖББҰ қатысқан жағдайда)"
          },
        ]
      },
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
    const [subSelected, setSubSelect] = useState(null);

    const handleChange = e => {
      if ([e.target.name].toString() === 'files') {
        setFiles(e.target.files);
      }
    }

    const selectChange = e => {
      setSelect(e.target.value)
    }

    const subSelectChange = e => {
      setSubSelect(e.target.value)
    }

    const saveArticle = async (data) => {
        const formData = new FormData();
        files && formData.append('files', files[0]);
        formData.append('title', data.title);
        formData.append('direction', data.direction)
        formData.append('sub_direction', data.sub_direction)
        formData.append('title_subdir', data.title_subdir)


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
                            <select {...register('sub_direction')} onChange={e => subSelectChange(e)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-2" required>
                              {DIR_CHOICES.map((item) => {
                                return (
                                  item[selected] && item[selected].map((sub, i) => (
                                    <option key={i} value={sub.key}>{sub.value}</option>
                                  ))
                                )
                              })}
                            </select>
                          </div>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <select {...register('title_subdir')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-2 py-2" required>
                              {DIR_CHOICES.map((item) => {
                                return (
                                  item[selected] && item[selected].map(subItem => {
                                    return (
                                      subItem[subSelected] && subItem[subSelected].map((sub, i) => (
                                        <option key={i} value={sub.key}>{sub.value}</option>
                                      ))
                                    )
                                  })
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