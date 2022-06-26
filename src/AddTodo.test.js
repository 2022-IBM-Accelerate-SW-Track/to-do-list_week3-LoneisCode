import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { isElement } from 'react-dom/test-utils';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    for(let i = 1; i <= 2; i++){
      const createTask = screen.getByRole('textbox', {name: /Add New Item/i});
      const taskDate = screen.getByPlaceholderText("mm/dd/yyyy");
      const addBtn = screen.getByRole('button', {name: /ADD/i});
      const deadline ="06/26/2022";
      fireEvent.change(createTask, {target:{value:"Homework"}});
      fireEvent.change(taskDate, {target:{value: deadline}});
      fireEvent.click(addBtn);
    }
    const checkTask = screen.getByText(/Homework/i);// only need to use getByText to check if one was present
    //if two existed this would have failed.
    expect(checkTask).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const allDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /ADD/i});
  const deadline ="06/26/2022";
  fireEvent.change(allDate, {target:{value: deadline}});
  fireEvent.click(addBtn);
  const checkEmpty = screen.getByText(/You have no todo's left/i)
  expect(checkEmpty).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const createTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(createTask, {target:{value:"Homework"}});
  const addBtn = screen.getByRole('button', {name: /ADD/i});
  fireEvent.click(addBtn);
  const checkEmpty = screen.getByText(/You have no todo's left/i)
  expect(checkEmpty).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const createTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const taskDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /ADD/i});
  const deadline ="06/26/2022";
  fireEvent.change(createTask, {target:{value:"Homework"}});
  fireEvent.change(taskDate, {target:{value: deadline}});
  fireEvent.click(addBtn);
  const checkTask = screen.getByText(/Homework/i);
  expect(checkTask).toBeInTheDocument();
  const foundChkBx = screen.getByRole('checkbox');
  fireEvent.click(foundChkBx);
  const checkEmpty = screen.getByText(/You have no todo's left/i)
  expect(checkEmpty).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const createTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const taskDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addBtn = screen.getByRole('button', {name: /ADD/i});
  const deadline ="06/26/2021";
  fireEvent.change(createTask, {target:{value:"Homework"}});
  fireEvent.change(taskDate, {target:{value: deadline}});
  fireEvent.click(addBtn);
  const checkTask = screen.getByText(/Homework/i);
  expect(checkTask).toBeInTheDocument();
  const grabTaskColor = screen.getByTestId(/Homework/i).style.background;
  expect(grabTaskColor).toBe( "red");

 });
