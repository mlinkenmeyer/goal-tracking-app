import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import "./UserCard.css";

function UserCard({ id, name, activeIndex }) {
    // const { 
    //     attributes, 
    //     listeners, 
    //     setNodeRef, 
    //     transform, 
    //     transition 
    // } = useSortable({ id })
    const {
        listeners,
        attributes,
        setNodeRef,
        transition,
        transform,
        active,
        isSorting,
        index,
        over
      } = useSortable({
        id
      });

    const isActive = active?.id === id;
    const insertPosition =
        over?.id === id ? (index > activeIndex ? 1 : -1) : undefined;

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    // return (
    //     <div
    //         ref={setNodeRef}
    //         style={style}
    //         {...attributes}
    //         {...listeners}
    //         className="user"
    //         >
    //         {id} | {name}
    //     </div>
    // )
    return (
        <>
          {insertPosition === -1 && (
            <div style={{ width: 200, height: 10, backgroundColor: "red" }} />
          )}
          <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="user">
            {id} | {name}
          </div>
          {insertPosition === 1 && (
            <div style={{ width: 200, height: 10, backgroundColor: "blue" }} />
          )}
        </>
      );

    
}
// function User({ id, name }) {
//     const {attributes, listeners, setNodeRef, transform} = useDraggable({
//       id: 'draggable',
//     });
//     const style = transform ? {
//       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//     } : undefined;
  
    
//     return (
//       <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//         {id} | {name}
//       </button>
//     );
//   }

export default UserCard;