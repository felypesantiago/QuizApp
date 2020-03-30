import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';

let Hero = () => 
  <div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book written by the authow shown</p>
    </div>
  </div>;

let Turn = ({author, books, highlight, onAnswerSelected}) => {
  const mapping = {'none': '',
                     'correct': 'green',
                     'wrong': 'red'
                    };

  const highlightToBgColor = highlight => mapping[highlight];

  return (
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author"/>
      </div>
      <div className="col-6"> 
        {books.map(title => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
}


let Book = ({title, onClick}) => 
  <div className="answer" onClick={() => onClick(title)}>
    <h4>{title}</h4>
  </div>


let Continue = ({show, onContinue}) => 
  <div className="row continue">
    { show &&
      <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
    }
  </div>


let Footer = () => 
  <div id="footer" className="row">
    <div className="col-12">
    <p className="text-muted credit">
        All image are from <a href="http://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
      </p>
    </div>
  </div>;


let AuthorQuiz = ({turnData, highlight, onAnswerSelected, onContinue}) => 
    <div className="container-fluild">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight === 'correct'} onContinue={onContinue}/>
      <p><Link to="/add">Add an Author</Link></p>
      <Footer />
    </div>;

export default AuthorQuiz;
