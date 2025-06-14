// export default function App() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;

//     const formData = new FormData(form);
//     const username = formData.get('username');
//     console.log('Username:', username);

//     form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//////////////////////////////////////////

// export default function App() {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get('username') as string;
//     console.log('Name:', username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
////////////////////////////////////////////

// import OrderForm from '../OrderForm/OrderForm';

// export default function App() {
//   const handleOrder = (data: string) => {
//     console.log('Order received from', data);
//     // можна зберегти замовлення, викликати API, показати повідомлення тощо
//   };

//   return (
//     <>
//       <h1>Place your order</h1>
//       <OrderForm onSubmit={handleOrder} />
//     </>
//   );
// }

/**
 У компоненті App ми використовуємо OrderForm і передаємо в неї пропс onSubmit, який є функцією для обробки замовлення. 
 
 * Що тут важливо:

OrderForm не знає, що буде з даними – вона просто викликає onSubmit(data)
Компонент форми не залежить від того, як саме обробляються дані – це зовнішня відповідальність.
Код стає чистішим: форма не має логіки, яку вона не повинна знати.
 */

//==========================================================//
// import axios from 'axios';
//==================================///
// import SearchForm from '../SearchForm/SearchForm';
// import { useState } from 'react';
// import { Article } from '../../types/articles';
// import ArticleList from '../ArticleList/ArticleList';
// import Loader from '../Loader/Barloader';
// // 1. Імпортуємо HTTP-функцію
// import { fetchArticles } from '../sevices/articleService';

// // interface ArticlesHttpResponse {
// //   hits: Article[];
// // }

// export default function App() {
//   // 1. Оголошуємо і типізуємо стан
//   const [articles, setArticles] = useState<Article[]>([]);
//   // 1. Додаємо стан індикатора завантаження
//   const [isLoading, setIsloading] = useState(false);
//   // 1. Оголошуємо стан для обробки помилок запиту
//   const [isError, setIsError] = useState(false);

//   const handleSearch = async (topic: string) => {
//     try {
//       setIsloading(true);
//       setIsError(false);

//       const data = await fetchArticles(topic);
//       setArticles(data);
//     } catch {
//       setIsError(true);
//     } finally {
//       // 5. Встановлюємо стан isLoading в false
//       // після будь якого результату запиту
//       setIsloading(false);
//     }
//   };

//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//       {isLoading && <Loader />}
//       {isError && <p>Whoops, something went wrong! Please try again!</p>}
//       {articles.length > 0 && <ArticleList items={articles} />}
//     </>
//   );
// }
//=================HOOK useId==================//

// import OrderForm1 from '../OrderForm1/order Form1';

// export default function App() {
//   return (
//     <div>
//       <h1>Welcome to our store!</h1>
//       <OrderForm1 />
//     </div>
//   );
// }

//==============MODULE-3-FORMS====================//
//====== FINAL APP==========//

// import OrderFormRadio from '../OrderFormRadio/OrderFormRadio';

// export default function App() {
//   return (
//     <>
//       <OrderFormRadio />
//     </>
//   );
// }

//===============================================//
// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
//============MODULE-3_6-side effect==================//
// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

/*                     ⚠️Заняття 6⚠️. 
 * 
React-компоненти проходять три основні етапи у своєму житті:

Монтування (Mounting) – це перший рендер, коли компонент вперше з’являється на сторінці.
Оновлення (Updating) – компонент оновлюється кожного разу, коли змінюються стан або пропси та React виконує повторний рендер.
Розмонтування (Unmounting) – компонент видаляється зі сторінки, наприклад коли використовується умовний рендер.

Ми вже розуміємо як виконати й обробити HTTP запит при події, наприклад при сабміті форми. А як зробити запит коли компонент тільки завантажився і користувач ще не виконав ніяких дій?

Спробуємо наступний код. Не будемо поки що додавати типи, щоб не ускладнювати: */

//:::::::::::::::::::::::::::::::::::::::::::::::::://

// import { useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [person, setPerson] = useState(null);

//   axios
//     .get('https://swapi.info/api/people/1')
//     .then(response => setPerson(response.data));

//   return (
//     <>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }

//:::::::::::::::::::::::::::::::::::::::::::::::::::://
/**При монтуванні компонента App відбувається HTTP-запит
Результат запиту зберігається в стан person
Після зміни стану person відбувається рендер компонента й оновлення JSX

На перший погляд може здатися, що все працює добре, але у нас є велика проблема, яку можна побачити якщо додати логування якогось сповіщення в консоль (або якщо подивитись на вкладку Network). */
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//

// import { useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [person, setPerson] = useState(null);

//---------------------------------------------
// console.log('App rendred!');

//Тепер якщо запустити цей код (спробуйте у себе в редакторі), то побачимо в консолі нескінченне логування рядка із console.log.

//------------------------------------------

//   axios
//     .get('https://swapi.info/api/people/1')
//     .then(response => setPerson(response.data));

//   return (
//     <>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }

//--------------------------------------------------//
/**Проблема в тому, що компоненти оновлюються кожен раз коли змінюються їх пропси або стан. Отже, кожен раз коли змінюється стан person компонент App рендериться заново, тобто викликається функція App і виконується весь код всередині – логування, запит і зміна стану, що призводить до нескінченного циклу оновлень!

Для того, щоб розв'язати цю проблему, нам потрібен побічний ефект (side effect) – це будь-який код, який взаємодіє з зовнішньою системою при монтуванні або оновленні компонента: локальне сховище, звернення до сервера, пряма робота з браузером тощо. */

/**============Хук useEffect========================//

Для того, щоб оголосити побічний ефект використовується вбудований хук useEffect.

useEffect(() => {
	// код ефекту
}, [])

Перший аргумент (обов’язковий) це анонімна функція, всередині якої виконується вся логіка ефекту. Наприклад, запити на сервер, запис у локальне сховище і т.п.
Другий аргумент (необов’язковий) це масив залежностей ефекту. Якщо не передати його, ефект буде викликаний при кожному оновленні компонента, тому ми завжди передаємо масив залежностей.

🧠 Хук useEffect не повертає жодного значення як результат своєї роботи, а лише запускає виконання функції. Іншими словами, неможливо виконати в середині функції обчислення і повернути їх у зовнішній код. Ефекти не призначені для обчислень!

Ось як буде виглядати наш код з useEffect:
//
*/
//--------------------------------------------------//
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     console.log('Effect ran!');
//     axios
//       .get('https://swapi.info/api/people/1')
//       .then(response => setPerson(response.data));
//   }, []);

//   console.log('App rendred!');

//   return (
//     <>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }
//--------------------------------------------------//
/**Покроково розберемо що саме відбулося:

Компонент App завантажився (був змонтований), ініціалізував стан та намалював розмітку
Після цього виконалась функція ефекта та запустився HTTP-запит
Після запиту було запущено оновлення стану person
Після оновлення стану функція App була викликана, оновився інтерфейс, але ефект повторно не виконався й у нас більше немає нескінченного циклу оновлень.


Завдяки порожньому масиву залежностей такий ефект виконується тільки один раз – при завантаженні компонента в якому він оголошений.



🧠 Будь-який код усередині функції ефекту гарантовано буде виконано лише після того, як React змонтує елементи в DOM – іншими словами, після того, як JSX компонента буде "намальовано" на сторінці. */
//=================================================================//
//=================================================================//
//=================================================================//

/**----------------Залежності ефекта------------------------//
Додамо у компонент стан count для зберігання значення лічильника. */
//--------------------------------------------------//
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [count, setCount] = useState(1); // Додали у компонент стан count
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     console.log('Effect ran!');
//     axios
//       .get('https://swapi.info/api/people/1')
//       .then(response => setPerson(response.data));
//   }, []); // Порожній масив залежностей

//   console.log('App rendered!');

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>The count is {count}</button>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }
//--------------------------------------------------//
/**Кожен раз при оновленні стану count ми побачимо в консолі тільки повідомлення App rendered, тому що ефект не реагує на оновлення компонента – його масив залежностей порожній.
  
 * /*====================CHAT GPT========================//
[] — це масив залежностей ефекту.

Він каже React: "Запусти цей ефект лише один раз після першого рендеру і ніколи більше."

Тобто useEffect спрацює лише після mount (монтування компонента).
//=====================================================//

🧠 Якщо другим аргументом useEffect передати порожній масив, то такий ефект виконується лише один раз – при першому рендері компонента (монтуванні), і більше ніколи. Такі ефекти використовуються для виконання коду без очікування дій користувача: запити за початковими даними, додавання слухачів на документ, запуск таймерів тощо.


Якщо ми додамо стан count як залежність ефекта, він спрацює при першому рендері App, а потім при кожному оновленні count. Поки що приберемо HTTP-запит і сфокусуємось на ефекті.
*/
//--------------------------------------------------//
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [count, setCount] = useState(1);
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     console.log('Effect ran!');
//   }, [count]);

//   console.log('App rendered!');

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>The count is {count}</button>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }
//--------------------------------------------------//
/**🧠 Залежності ефекта – це масив значень, за якими React стежить між рендерами. Якщо будь-яке з цих значень зміниться між двома рендерами, React зрозуміє, що потрібно знову виконати функцію ефекта.
Це можуть бути: стан, пропси або будь-які локальні змінні з компонента.


Розуміючи як працюють залежності ефекта, зробимо так щоб при оновленні count виконувався новий запит. */
//--------------------------------------------------//
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [count, setCount] = useState(1);
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     console.log('Effect ran!');
//     axios
//       // 1. Використовуємо count в ефекті
//       .get(`https://swapi.info/api/people/${count}`)
//       .then(response => setPerson(response.data));
//   }, [count]); // 2. Додаємо count в залежності ефекта

//   console.log('App rendered!');

//   return (
//     <>
//       <h2>The count is {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Get next character</button>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }
//--------------------------------------------------//
/**Синтаксис async/await
При використанні синтаксису async/await в ефектах є одна особливість – колбек-функція, яку ми передаємо useEffect, не може бути асинхронною.

// ❌ Так робити не можна!❌ 
useEffect(async () => { 
	const response = await axios.get(`https://swapi.info/api/people/${count}`);
  setPerson(response.data);
}, [count]);

При такому коді лінтер в редакторі ❌ підкреслить код ефекту, і при наведенні ми побачимо наступне повідомлення з поясненням та прикладом того, як робити правильно.

Отже, всередині колбек-функції необхідно оголосити ще одну функцію, яка буде асинхронною, і викликати її одразу після оголошення. HTTP-запити слід виконувати всередині цієї функції.

useEffect(() => {
	// 1. Оголошуємо асинхронну функцію
  async function fetchData() {
    // Тут будемо виконувати HTTP-запит
  }

	// 2. Викликаємо її одразу після оголошення
  fetchData();
}, []);

Виконаємо рефакторинг коду нашого прикладу: */
//--------------------------------------------------//
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function App() {
//   const [count, setCount] = useState(1);
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     // 1. Оголошуємо асинхронну функцію
//     async function fetchCharacter() {
//       const response = await axios.get(
//         `https://swapi.info/api/people/${count}`
//       );
//       setPerson(response.data);
//     }

//     // 2. Викликаємо її одразу після оголошення
//     fetchCharacter();
//   }, [count]);

//   return (
//     <>
//       <h2>The count is {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Get next character</button>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }
//--------------------------------------------------//

/**---------------Суворий режим--------------------//
У наступному прикладі робимо логування рядка в ефекті з порожнім масивом залежностей.

*/

// import { useState, useEffect } from 'react';

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   useEffect(() => {
//     console.log('You can see me only once!');
//   }, []);

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// }
//---------------------ОЧИЩЕННЯ ЕФЕКТІВ----------------------.//
// import Timer from '../Timer/Timer';

// export default function App() {
//   return (
//     <>
//       <Timer />
//     </>
//   );
// }

//--------------------------------------------------------//
/**На перший погляд, все буде працювати добре, але якщо подивитись в консоль, ми побачимо, що будуть запущені два інтервали замість одного:

Компонент Timer монтується в DOM вперше.
Виконується ефект і запускається інтервал.
Компонент Timer розмонтується і видаляється з DOM.
Компонент Timer монтується в DOM вдруге.
Виконується ефект і запускається інтервал.
Компонент залишається в DOM і готовий до оновлень.

Може здатися, що StrictMode заважає і, навпаки, руйнує нашу логіку, і ви будете праві. StrictMode говорить нам, що в разі розмонтування компонента ми не зупиняємо інтервал, що при повторних монтуваннях призводить до запуску все нових і нових інтервалів і, відповідно, витоку пам'яті.

Додамо в компонент App стан isOpen, який буде контролювати видимість компонента Timer. */
//--------------------------------------------------------//
// import { useState } from 'react';
// import Timer from '../Timer/Timer';

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? 'Hide timer' : 'Show timer'}
//       </button>
//       {isOpen && <Timer />}
//     </>
//   );
// }
//--------------------------------------------------------//
/**=============Функція очищення=================//

Хук useEffect може оголошувати функцію очищення ефекту (cleanup), для цього з колбек-функції потрібно повернути ще одну функцію. */
//------------------------------------------//
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log(`Effect ran for: ${count}`);

//     // Повертаємо функцію очищення ефекта
//     return () => {
//       console.log(`Clean up for ${count}`);
//     };
//   }, [count]);

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Count is {count}</button>
//     </>
//   );
// }
//------------------------------------------//
/**Функція очищення запускається перед кожним наступним викликом ефекту і перед розмонтуванням компонента, тобто:

Перший запуск ефекту.
Очищення першого ефекту.
Другий запуск ефекту.
Очищення другого ефекту.
Третій запуск ефекту.
І так далі.


Тепер ми можемо виправити проблему з таймером, достатньо при розмонтуванні компонента очищати інтервал. Для цього зберігаємо ідентифікатор інтервалу в змінну і в функції очищення викликаємо clearInterval. */
//----------------------------------------------//
// import { useState } from 'react';
// import Timer from '../Timer/Timer';

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? 'Hide timer' : 'Show timer'}
//       </button>
//       {isOpen && <Timer />}
//     </>
//   );
// }
//---------------------------------------------//

/**=========Модальне вікно=================//
 * 
Модальне вікно (modal) – це елемент інтерфейсу, який накладається поверх усього контенту сторінки та вимагає взаємодії з ним, перш ніж користувач зможе повернутись до основного вмісту.

Приклади:

Попап із зображенням.
Підтвердження видалення.
Форма зворотного зв’язку.
Галерея зображень.

Компонент модального вікна

Почнемо з простого компонента модалки. Спершу створимо сам компонент Modal.tsx, який відображатиме заголовок і текст:
!!!!!!!! компонент створюємо в папці Modal !!!!!!!!!!
*/
//---------------------------------------------//

// import Modal from '../Modal/Modal';

// export default function App() {
//   return (
//     <>
//       <div>
//         <h1>Main content of the page</h1>
//         <Modal />
//       </div>
//     </>
//   );
// }
// ---------------------------------------------//

/**Кнопка закриття

Зазвичай у модальному вікні є кнопка закриття (хрестик у кутку). Ми передамо в компонент Modal функцію onClose, яку будемо викликати, коли користувач натисне кнопку.
 */

//Оновимо код App і додамо логіку відображення модального вікна за допомогою стану.
//...............................................//
// import { useState } from 'react';
// import Modal from '../Modal/Modal';

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       <h1>Main content of the page</h1>
//       <button onClick={openModal}>Open modal</button>
//       {isModalOpen && <Modal onClose={closeModal} />}
//     </div>
//   );
// }

//...............................................//
// **=================Повторне використання====================//

// Модальне вікно - це класичний приклад компонента, який може бути використаний повторно у різних частинах додатку. Замість того, щоб писати окрему модалку для кожної ситуації, ми можемо створити один компонент, який буде приймати різний внутрішній контент.

// <Modal>
//   <h2>Custom Modal Content</h2>
//   <p>This JSX will be passed as children prop</p>
// </Modal>

// Будь який контент між відкриваючим та закриваючим тегом компонента буде передано як children - спеціальний службовий пропс, що дозволяє передавати дочірні елементи (компоненти або JSX) в компонент. Це дає змогу зробити компонент максимально гнучким.

// Таким чином ми можемо створити один компонент модального вікна, яке буде відображати різний вміст в залежності від того, що ми передаємо в children.

// Для типізації пропса children використовуємо стандартний тип React.ReactNode, який описує будь-який вміст, що може бути переданий в компонент: елементи, рядки, числа, масиви елементів або навіть інші компоненти.

// .............................
// interface ModalProps {
//   children: React.ReactNode;
// }
// .............................
/**Тепер можемо використовувати компонент Modal в різних частинах додатку і передавати в нього різний контент, не створюючи новий компонент для кожної ситуації. */
// import { useState } from 'react';
// import Modal from '../Modal/Modal';

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       <h1>Main content of the page</h1>
//       <button onClick={openModal}>Open modal</button>
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <h2>Custom Modal Content</h2>
//           <p>This is a reusable modal with dynamic content.</p>
//         </Modal>
//       )}
//     </div>
//   );
// }
/**Тепер у нас повноцінне, доступне, реюзабельне, типізоване модальне вікно з підтримкою клавіатури та стилями. */
//==================================================================//

//============Робота з LocalStorage==================//

// У React-додатках часто потрібно зберігати дані між сесіями користувача: обрані фільтри, налаштування теми, останній пошук тощо. Для цього використовують localStorage – вбудоване сховище браузера.

// Розглянемо приклад – кнопка, яка підраховує кліки. При перезавантаженні сторінки лічильник має зберігатися.

// import { useState } from 'react';

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   return (
//     <div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         You clicked {clicks} times
//       </button>
//       <button onClick={() => setClicks(0)}>Reset</button>
//     </div>
//   );
// }

/**Запис у LocalStorage

Кожного разу, коли значення clicks змінюється – ми можемо зберігати його в localStorage за допомогою useEffect. */

// import { useState, useEffect } from 'react';

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   useEffect(() => {
//     localStorage.setItem('saved-clicks', JSON.stringify(clicks));
//   }, [clicks]);

//   const [clicks, setClicks] = useState(() => {
//     // Зчитуємо значення за ключем
//     const savedClicks = window.localStorage.getItem('saved-clicks');

//     // Якщо там щось є, повертаємо це
//     // значення як початкове значення стану
//     if (savedClicks !== null) {
//       return JSON.parse(savedClicks);
//     }

//     // У протилежному випадку повертаємо
//     // яке-небудь значення за замовчуванням
//     return 0;
//   });

//   return (
//     <div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         You clicked {clicks} times
//       </button>
//       <button onClick={() => setClicks(0)}>Reset</button>
//     </div>
//   );
// }

// //////////////////////////////////////////////////////////////
// Зчитування з LocalStorage

// Нам потрібно зчитати збережене значення при першому рендері компонента. Для цього використовуємо форму useState(() => {}), яка дозволяє виконати код перед ініціалізацією стану.

// В цій функції можна виконати додатковий код, наприклад, читання з локального сховища!

/////////////////////////////////////////////////////////////////////////////

// =========================Декілька ефектів=========================
// У компоненті можна використовувати скільки завгодно useEffect. Кожен useEffect спрацьовує окремо, залежно від своїх залежностей. Це дозволяє розділяти логіку за призначенням, і не писати все в один великий ефект.

// Наприклад, додамо до компонента три ефекти які будуть запускатись відповідно до вказаних залежностей і незалежно від інших.

// import { useState, useEffect } from 'react';

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   // 1. Тільки один раз після монтування
//   useEffect(() => {
//     console.log('You can see me only once!');
//   }, []);

//   // 2. Кожного разу, коли змінюється clicks
//   useEffect(() => {
//     console.log('Clicks updated:', clicks);
//   }, [clicks]);

//   // 3. При кожному рендері (бо без залежностей)
//   useEffect(() => {
//     document.title = `You clicked ${clicks} times`;
//   });

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// }

// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// Якщо в компоненті є кілька значень стану, ефекти можуть відстежувати кожне значення окремо або всі разом.

import { useState, useEffect } from 'react';

export default function App() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    console.log('First updated:', first);
  }, [first]);

  useEffect(() => {
    console.log('Second updated:', second);
  }, [second]);

  useEffect(() => {
    console.log('First or second updated:', first + second);
  }, [first, second]);

  return (
    <>
      <button onClick={() => setFirst(first + 1)}>First: {first}</button>
      <button onClick={() => setSecond(second + 1)}>Second: {second}</button>
    </>
  );
}
//Що важливо знати про ефекти

/**
Кожен useEffect виконується після монтування компонента.
Якщо ви вказали залежності – ефект також буде виконуватись при кожній зміні цих значень.
Завжди вказуйте точні залежності – ESLint підкаже, якщо щось забудете.
Ви можете використовувати декілька useEffect в одному компоненті – це навіть рекомендовано, якщо логіка ефектів різна.


🧠 Розділення ефектів за призначенням – це частина добре структурованого React-коду.
 */
