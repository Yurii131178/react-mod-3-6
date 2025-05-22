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
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export default function Modal() {
  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
      </div>
    </div>,
    document.body
  );
}
//....................................................//
