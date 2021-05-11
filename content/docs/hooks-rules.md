---
id: hooks-rules
title: Hooks дүрэм
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hooks* нь React 16.8 хувилбарын шинэ нэмэлт. They let you use state and other React features without writing a class.

Hooks нь Жаваскрипт функцууд боловч тэдгээрийг хэрэглэхэд дагах хоёр дүрэм бий. Бид тэдгээр дүрмүүдийг автоматаар мөрдүүлэх [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) санал болгож байна.

### Hooks-г зөвхөн дээд түвшинд дуудах {#only-call-hooks-at-the-top-level}

**Hooks-г давталт, нөхцөл болон nested функц дотор битгий дуудаарай.** Оронд нь Hooks-ээ React функцийнхээ дээд түвшинд ашиглана уу. Энэ дүрмийг мөрдснөөр Hooks нь дүрслэгдэж байгаа компонент дээр үргэлж ижил дарааллаар дуудагдахийг баталгаажуулна. Энэ нь React-д Hooks-н төлвийг `useState` болон `useEffect`-н давтан дуудалтуудын үед төлвийг хадгалахад тус болдог. (Хэрэв та сонирхож байвал бид илүү дэлгэрэнгүй [доор](#explanation) тайлбарлах болно.)

### Hooks-г зөвхөн React функцуудээс дууд {#only-call-hooks-from-react-functions}

**Hooks-г энгийн Жаваскрипт функцээс битгий дуудаарай.** Оронд нь та:

* ✅ React функц компонентоос Hooks дуудах.
* ✅ Custom Hooks-с Hooks дуудах (бид энэ талаар [дараагийн хуудас дээр](/docs/hooks-custom.html) сурах болно).

Энэ дүрмийг мөрдснөөр та бүх төлөвт логик эх код дээр цэвэрхэн харагдах баталгааг олгоно.

## ESLint Plugin {#eslint-plugin}

Бид [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) нэртэй ESLint plugin гаргасан бөгөөд эдгээр хоёр дүрмүүдийг мөрдүүлдэг. Та энэ плагинийг хүсвэл өөрийн төсөлдөө нэмж болно:
Энэхүү plugin нь [Create React App](/docs/create-a-new-react-app.html#create-react-app) анхнаасаа багтсан байдаг.

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```js
// Your ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Hooks дүрмүүдийг шалгах
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```
Цаашдаа бид энэ плагинийг [Create React App](/docs/create-a-new-react-app.html#create-react-app). болон ижил төстэй хэрэслүүд дээр анхнаас байлгахаар төлөвлөж байна.

**Та хэрхэн [өөрийн Hooks](/docs/hooks-custom.html) бичих талаар тайлбарласан хуудсийг одоохондоо алгасаж болно.** Энэ хуудсанд бид эдгээр дүрмүүдийн цаадах шалтгаанийг тайлбарлах болно.

## Тайлбар {#explanation}

Бидний [өмнө сурснаар](/docs/hooks-state.html#tip-using-multiple-state-variables), бид олон төлөв болон еффект Hooks-г нэг компонент дээр хэрэглэж болно:

```js
function Form() {
  // 1. name төлөв хувьсагч хэрэглэх
  const [name, setName] = useState('Mary');

  // 2. Формыг хадгалах эффект хэрэглэх
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. surname төлөв хувьсагч хэрэглэх
  const [surname, setSurname] = useState('Poppins');

  // 4. Гарчиг шинэчлэх эффект хэрэглэх
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

React хэрхэн ямар `useState` дуудалт нь ямар төлөвт харгалзахаа мэдэх вэ? Хариулт бол **React Hooks дуудагдсан дараалал дээр тулгуурладаг**. Бид жишээ дүрслэл болгон дээр ижил дарааллаар дуудагдаж байгаа учир ажиллана:

```js
// ------------
// First render
// ------------
useState('Mary')           // 1. name төлөв хувьсагчийг 'Mary' утгаар эхлүүлэх
useEffect(persistForm)     // 2. Формыг хадгалах эффект нэмэх
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Гарчиг шинэчлэх эффект нэмэх

// -------------
// Second render
// -------------
useState('Mary')           // 1. name төлөв хувьсагчийг унших (аргументийг ашиглагдахгүй)
useEffect(persistForm)     // 2. Формыг хадгалах эффектийг солих
useState('Poppins')        // 3. surname төлөв хувьсагчийг унших (аргументийг ашиглахгүй)
useEffect(updateTitle)     // 4. Гарчиг шинэчлэх эффектийг солих

// ...
```

Дүрслэл болгоны Hooks дуудалтуудын дараалал өөрчлөгдөөгүй үед React дотоод төлвүүдтэй нэг бүртэй нь харьцаж чадна. Хэрэв бид нөхцөл дунд Hooks дуудалт(жишээлбэл, `persistForm` эффект) нэмбэл юу болох вэ?

```js
  // 🔴 Hooks-г нөхцөл дотор бичин эхний дүрмийг зөрчиж байна
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

`name !== ''` нөхцөл эхний дүрслэл дээр `үнэн` байх ба бид энэ Hook-г ажиллуулна. Харамсалтай нь дараагийн дүрслэл дээр хэрэглэгч формыг цэвэрлэхийг хүсэж болох ба ингэснээр энэ нөхцлийг `худал` болох нөхцөл үүснэ. Ингэснээр бид энэ Hook-г дүрслэл дунд алгасах ба Hook-уудын дуудалтын дараалал өөр болно:

```js
useState('Mary')           // 1. name төлөв хувьсагчийг унших(аргумент ашиглагдахгүй)
// useEffect(persistForm)  // 🔴  Энэ Hook-г алгасна!
useState('Poppins')        // 🔴 2 (3 байсан). surname төлөв хувьсагчийг уншиж чадахгүй
useEffect(updateTitle)     // 🔴 3 (4 байсан). Эффектийг өөрчилж чадахгүй
```

React хоёрдах `useState` Hook дуудалт дээр юу буцаахаа мэдэхгүй болно. React хоёрдах Hooks дуудалтийг `persistForm` эффектэд харгалж Hooks гэж хүлээж авах бөгөөд учир нь өмнөх дуудалт дээр тийм байсан. Гэвч одоо тийм байхаа больсон. Эндээс эхлэн дараагийн Hook дуудалт бүр нэгээр шилжин алдаа руу чиглүүлнэ.

**Ийм учраас компонентийн дээд түвшнээс Hooks дуудагдах ёстой байдаг.** Бид эффектийг нөхцөлтэй ажиллуулах шаардлагатай бол нөхцлөө Hook *дотор* бичиж болно:

```js
  useEffect(function persistForm() {
    // 👍 Бид эхний дүрмийг зөрчихгүй боллоо
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Та бидний бэлдэж өгсөн [lint дүрмийг](https://www.npmjs.com/package/eslint-plugin-react-hooks) ашиглавал та энэ асуудалд санаа зовохгүй байж болно.** Гэвч та *яагаад* Hooks work ингэж ажилладаг талаар, ямар асуудлаас сэргийлж байгаа талаар мэдэх нь чухал.

## Next Steps {#next-steps}

Эцэст нь бид [өөрсдийн Hooks хэрхэн бичих талаар](/docs/hooks-custom.html) сурахад бэлэн боллоо! Custom Hooks нь React-д байгаа Hooks-тэй нийлүүлэн нийтлэг ашиглагддаг төлөвт логик өөр өөр компонентууд дээр дахин ашиглах боломжийг олгодог.
