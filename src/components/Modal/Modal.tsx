// import css from './Modal.module.css';

// export default function Modal() {
//   return (
//     <div className={css.backdrop}>
//       <div className={css.modal}>
//         <h2>Modal Title</h2>
//         <p>This is some contant inside the modal.</p>
//       </div>
//     </div>
//   );
// }
//..........................................................//
/**===============Портали==================//

Зараз ми вставляємо компонент прямо в DOM-дерево компонента App, але це може створити проблеми:

Модалка може успадкувати стилі з батьківського компонента.
Не буде ізольованості по верстці (наприклад, overflow: hidden у батька може обрізати модалку).
Погана доступність.

Щоб уникнути цього, модалки в React майже завжди рендерять через Portal. Функція createPortal дозволяє рендерити компонент в інше місце DOM-дерева, зазвичай безпосередньо в <body>. Таким чином:

Модалка не залежить від структури компонентів.
Рендериться поверх усього.
Гарантовано працює навіть в умовах вкладеності.

Оновимо Modal.tsx, щоб використати createPortal: */

//....................................................//
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// export default function Modal() {
//   return createPortal(
//     <div className={css.backdrop}>
//       <div className={css.modal}>
//         <h2>Modal Title</h2>
//         <p>This is some content inside the modal.</p>
//       </div>
//     </div>,
//     document.body
//   );
// }
//....................................................//
/**Тепер незалежно від того, де в структурі компонентів ми використаємо <Modal /> – в HTML вона завжди зʼявиться в кінці body, поверх усього іншого. */

/**Кнопка закриття

Зазвичай у модальному вікні є кнопка закриття (хрестик у кутку). Ми передамо в компонент Modal функцію onClose, яку будемо викликати, коли користувач натисне кнопку. */
//..........................................................//

// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// interface ModalProps {
//   onClose: () => void;
// }

// export default function Modal({ onClose }: ModalProps) {
//   return createPortal(
//     <div className={css.backdrop}>
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           &times; {/**важчий крестик {'\u2716'} */}
//         </button>

//         <h2>Modal Title</h2>
//         <p>This is some content inside the modal.</p>
//       </div>
//     </div>,
//     document.body
//   );
// }

//....................................................................//
/**Закриття по кліку на фон

Класичний UX-патерн: якщо користувач клацає за межами вікна – модалка закривається. Додаємо логіку кліку по бекдропу. */
//........................................................//
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';
// interface ModalProps {
//   onClose: () => void;
// }

// export default function Modal({ onClose }: ModalProps) {
//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div
//       className={css.backdrop}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           &times;
//         </button>

//         <h2>Modal Title</h2>
//         <p>This is some content inside the modal.</p>
//       </div>
//     </div>,
//     document.body
//   );
// }
//........................................................//
/**Закриття по Escape

Ще один зручний спосіб закриття – клавіша Escape. Для цього нам потрібен ефект із прослуховуванням події keydown. Додаємо useEffect, а подію keydown підписуємо на document, тому що модалка вже відкрита і не обов’язково в фокусі. */
//....................................................//
// import { createPortal } from 'react-dom';
// import { useEffect } from 'react';
// import css from './Modal.module.css';

// interface ModalProps {
//   onClose: () => void;
// }

// export default function Modal({ onClose }: ModalProps) {
//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   return createPortal(
//     <div
//       className={css.backdrop}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           &times;
//         </button>

//         <h2>Modal Title</h2>
//         <p>This is some content inside the modal.</p>
//       </div>
//     </div>,
//     document.body
//   );
// }
//....................................................//
/**Заборона прокрутки фону

Коли модалка відкрита, сторінка не повинна скролитись. Додаємо у useEffect код блоквання скролу при відкритті модалки та повертаємо його після закриття. */

/**
  +++ Додаємо слухач події на document:

document.addEventListener("keydown", handleKeyDown); 
document.body.style.overflow = "hidden"; – Це вимикає прокрутку фону, коли модалка відкрита, щоб користувач не міг скролити вміст сторінки.

--- Фаза очищення (коли модалка закривається):

return () => {
  document.removeEventListener("keydown", handleKeyDown); // прибираємо слухач
  document.body.style.overflow = "";                      // відновлюємо прокрутку
}; */

//..................................................//
// import { createPortal } from 'react-dom';
// import { useEffect } from 'react';
// import css from './Modal.module.css';

// interface ModalProps {
//   onClose: () => void;
// }

// export default function Modal({ onClose }: ModalProps) {
//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = '';
//     };
//   }, [onClose]);

//   return createPortal(
//     <div
//       className={css.backdrop}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           &times;
//         </button>

//         <h2>Modal Title</h2>
//         <p>This is some content inside the modal.</p>
//       </div>
//     </div>,
//     document.body
//   );
// }
//..............................................//

/**=================Повторне використання====================//

Модальне вікно - це класичний приклад компонента, який може бути використаний повторно у різних частинах додатку. Замість того, щоб писати окрему модалку для кожної ситуації, ми можемо створити один компонент, який буде приймати різний внутрішній контент.

<Modal>
  <h2>Custom Modal Content</h2>
  <p>This JSX will be passed as children prop</p>
</Modal>

Будь який контент між відкриваючим та закриваючим тегом компонента буде передано як children - спеціальний службовий пропс, що дозволяє передавати дочірні елементи (компоненти або JSX) в компонент. Це дає змогу зробити компонент максимально гнучким.

Таким чином ми можемо створити один компонент модального вікна, яке буде відображати різний вміст в залежності від того, що ми передаємо в children.

Для типізації пропса children використовуємо стандартний тип React.ReactNode, який описує будь-який вміст, що може бути переданий в компонент: елементи, рядки, числа, масиви елементів або навіть інші компоненти.

.............................
interface ModalProps {
  children: React.ReactNode;
}
.............................

Доповнимо компонент модального вікна так, щоб використовувати children для рендеру вмісту. */
//.............................................................//
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  // Додаємо пропс children і типізуємо його
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Тут рендериться переданий вміст із пропса children */}
        {children}
      </div>
    </div>,
    document.body
  );
}
//.............................................................//

/**Тепер можемо використовувати компонент Modal в різних частинах додатку і передавати в нього різний контент, не створюючи новий компонент для кожної ситуації.
 *
 * /**Тепер у нас повноцінне, доступне, реюзабельне, типізоване модальне вікно з підтримкою клавіатури та стилями. */
//==================================================================//
