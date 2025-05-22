// import { useEffect, useState } from 'react';

// export default function Timer() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     setInterval(() => {
//       setTime(new Date());
//       console.log(`Interval - ${Date.now()}`);
//     }, 1000);
//   }, []);

//   return <p>TimerBox - {time.toLocaleTimeString()}</p>;
// }
//----------------------------------------------------------//
/**Функція очищення запускається перед кожним наступним викликом ефекту і перед розмонтуванням компонента, тобто:

Перший запуск ефекту.
Очищення першого ефекту.
Другий запуск ефекту.
Очищення другого ефекту.
Третій запуск ефекту.
І так далі.


Тепер ми можемо виправити проблему з таймером, достатньо при розмонтуванні компонента очищати інтервал. Для цього зберігаємо ідентифікатор інтервалу в змінну і в функції очищення викликаємо clearInterval. */
//----------------------------------//
import { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Зберігаєм ідентифікатор інтервалу в змінну
    const intervalId = setInterval(() => {
      setTime(new Date());
      console.log(`Interval - ${Date.now()}`);
    }, 1000);

    return () => {
      // 2. Видаляємо інтервал за його id
      clearInterval(intervalId);
    };
  }, []);

  return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}

//-------------------------------------//
