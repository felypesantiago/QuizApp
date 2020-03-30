import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'lodash';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventure os Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing It'
            ]
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: [' Heart od Darkness ']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining',
            'IT'
    ]
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield',
      'A Tale of Two City',
      'Roughing It'
    ]
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet',
      'Macbeth',
      'Romeo and Juliet'
    ]
  },
  {
    name: 'Joanne Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: [' Harry Potter and the Sorcerers Stone ']
  }
];

const App = () => {

  const getTurnData = (authors) => {
    const allBooks = authors.reduce((acc, author) => acc.concat(author.books), []);
  
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);
  
    return {
      books: fourRandomBooks,
      author: authors.find(author => author.books.some(book => book === answer))
    }
  };
  
  const useGameState = () => {
    const [turnData, setTurnData] = useState(getTurnData(authors));
    const [highlight, setHighlight] = useState('');
  
    return {turnData, setTurnData, highlight, setHighlight};
  }
  
  let gameState = useGameState();
  
  const onAnswerSelected = (answer) => {
    const isCorrect = gameState.turnData.author.books.some(book => book === answer);
  
    gameState.setHighlight(isCorrect ? 'correct' : 'wrong');
  }
  
  const resetState = () => {
    gameState.setTurnData(getTurnData(authors));
    gameState.setHighlight('');
  }

  return <AuthorQuiz {...gameState} onAnswerSelected={onAnswerSelected} onContinue={() => resetState()}/>;
}

const AuthorWrapper = withRouter(({history}) => {
  return <AddAuthorForm onAddAuthor={author => {
    authors.push(author);
    history.push('/');
  } }/>;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Route exact path="/" component={App}/>
        <Route path="/add" component={AuthorWrapper}></Route>
      </>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
