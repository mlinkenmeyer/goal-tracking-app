import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import "./UsersColumn.css"
import UserCard from "../UserCard/UserCard";

function UsersColumn({ users, activeIndex }) {
    
    return (
        <div className="column">
            <SortableContext items={users} strategy={verticalListSortingStrategy}>
                {users ? (
                users.map((user, id) => (
                <UserCard
                    key={id}
                    id={id}
                    name={user.name}
                    activeIndex={activeIndex}
                />
                ))
                ) : (
                    <p>Users Loading...</p>
                )}
            </SortableContext>
        </div>
    )
}
// function UsersColumn({ users }) {
//     const {isOver, setNodeRef} = useDroppable({
//       id: 'droppable',
//     });
//     const style = {
//       color: isOver ? 'green' : undefined,
//     };
    
    
//     return (
//       <div ref={setNodeRef} style={style}>
//             {users ? (
//                 users.map((user, id) => (
//                 <User
//                     key={id}
//                     id={id}
//                     name={user.name}
//                 />
//                 ))
//                 ) : (
//                     <p>Users Loading...</p>
//                 )}
//       </div>
//     );
//   }

export default UsersColumn;
