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

//============MODULE-3-side effect==================//
/**Заняття 6. 
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



// ❌ Так робити не можна!
useEffect(async () => { 
	const response = await axios.get(`https://swapi.info/api/people/${count}`);
  setPerson(response.data);
}, [count]);



При такому коді лінтер в редакторі підкреслить код ефекту, і при наведенні ми побачимо наступне повідомлення з поясненням та прикладом того, як робити правильно.






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

import { useState, useEffect } from 'react';

export default function App() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('You can see me only once!');
  }, []);

  return (
    <button onClick={() => setClicks(clicks + 1)}>
      You clicked {clicks} times
    </button>
  );
}
