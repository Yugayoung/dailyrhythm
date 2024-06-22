import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface TodoItem {
  id: string;
  text: string;
  status: string;
  markIcon?: string;
  markColor?: string;
  startDate?: Date;
  endDate?: Date;
}
type AddTodoParams = {
  text: string;
  markIcon?: string;
  markColor?: string;
  startDate?: Date;
  endDate?: Date;
};

interface TodoActions {
  addTodo: (params: AddTodoParams) => void;
}

interface TodoStore {
  todos: TodoItem[];
  actions: TodoActions;
}

export default function createTodoStore() {
  const today = new Date();
  return create<TodoStore>((set) => ({
    todos: [],
    actions: {
      addTodo: ({
        text,
        markIcon = '✅',
        markColor = 'transparent',
        startDate = today,
        endDate = today,
      }: AddTodoParams) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: uuidv4(),
              text,
              status: 'active',
              markIcon,
              markColor,
              startDate,
              endDate,
            },
          ],
        })),
    },
  }));
}
