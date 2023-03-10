import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Snake from './snake';
import Food from './food';
import PoisonousFood from './poisonous_food';
import Layout from './layout';

import snakeImage from './assests/images/snake.gif'
import coinImage from './assests/images/coin.gif'


const getRandomCoordinates = () => {

	let min = 1;
	let max = 28;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
};

function App() {
	const [snakeDots, setSnakeDots] = useState([[10, 10], [10, 12], [10, 14], [10, 16]]);
	const [foodDot, setFoodDot] = useState(getRandomCoordinates());
	const[active,setActive]=useState(true)
	const[poisonFood,setPoisonFood]=useState(getRandomCoordinates());
	const [direction, setDirection] = useState('RIGHT');
	const [alive, setAlive] = useState(false);
	const [speed, setSpeed] = useState(300);
	const [name, setName] = useState('Play');
	const [point, setPoint] = useState(0);
    const[title,setTitle]=useState("Snake Game with react")
	
	useEffect(() => {
		document.onkeydown = onKeyDown;
		checkIfOutOfBorders();
		checkIfEat();
	
		const run = setInterval(() => {
			moveSnake(alive);
		}, speed);
		return () => clearInterval(run);
	});

	function onKeyDown(e) {
		// console.log(e.keyCode);
		switch (e.keyCode) {
			case 38:
				setDirection('UP');
				break;
			case 40:
				setDirection('DOWN');
				break;
			case 37:
				setDirection('LEFT');
				break;
			case 39:
				setDirection('RIGHT');
				break;
			default:
				break;
		}
	}

	function moveSnake(state) {
		if (state === true) {
			let dots = [...snakeDots];
			let head = dots[dots.length - 1];//10,16
//[[10, 10], [10, 12], [10, 14], [10, 16],[10,18]]
			switch (direction) {
				case 'RIGHT':
					head = [head[0], head[1] + 2];
					break;
				case 'LEFT':
					head = [head[0], head[1] - 2];
					break;
				case 'DOWN':
					head = [head[0] + 2, head[1]];
					break;
				case 'UP':
					head = [head[0] - 2, head[1]];
					break;
				default:
					break;
			}
			dots.push(head);//[10, 10], [10, 12], [10, 14], [10, 16],[10,18]
			dots.shift();// [10, 12], [10, 14], [10, 16],[10,18]
			setSnakeDots(dots);
		}
	}

	function checkIfEat() {
		
		let head = snakeDots[snakeDots.length - 1];//10,16
	//	[[10, 10], [10, 12], [10, 14], [10, 16]]

		let food = foodDot; //10,16
		let poison_food=poisonFood;
		if(head[0]===poison_food[0] && head[1]===poison_food[1]){
			onGameOver()
		}
		if (head[0] === food[0] && head[1] === food[1]) {
			setFoodDot(getRandomCoordinates());
			if(active){
				setPoisonFood(getRandomCoordinates());
			}
			enlargeSnake();
			increaseSpeed();
			// if(point%5===0){
			// 	setActive(false);
			// }
			setPoint(point + 1);
		}
	
		if(point%5===0||point%7===0){
			setActive(false)
		}
		else{setActive(true)}
	}

	function onGameOver() {
		setAlive(false);
		setSnakeDots([[0, 0], [0, 2], [0, 4], [0, 6]]);
		setFoodDot([10, 10]);
		setPoint(0)
		setDirection('RIGHT');
		setTitle("Game Over")
	}

	function checkIfOutOfBorders() {
		//[10, 10], [10, 12], [10, 14], [10, 16]
		let head = snakeDots[snakeDots.length - 1];
		if (head[0] === 30 || head[1] === 30 || head[0] < 0 || head[1] < 0) {
			onGameOver();
		}
	}
	  

	function enlargeSnake() {
	
	//	[[10, 10], [10, 12], [10, 14], [10, 16]]            
	                              //10,16              //[[10, 10], [10, 12], [10, 14], [10, 16]] 
		let newSnake = [snakeDots[snakeDots.length - 1], ...snakeDots];
		// console.log(newSnake)
		setSnakeDots(newSnake);
	}

	function increaseSpeed() {
		if (speed > 10) {
			setSpeed(speed - 10);
		}
	}

	function rePlay() {
		setDirection('RIGHT');
		setName('Play again');
		// setPoint(0);
		setAlive(true);
		setTitle("Snake Game with React")
	}

	return (
		<Layout>
			<SnakeImage />
			<Title>{title}</Title>
			{alive ? (
				<div>
					<Box>
						<Content>Your Points:{point} </Content>
						<CoinImage />
					</Box>
					<Wrapper>
						<Snake snakeDots={snakeDots} />
						<Food foodDot={foodDot} />
					{point===0?"":
						(active?"":<PoisonousFood foodDot={poisonFood} />)
						
					}
					
					</Wrapper>
				</div>
			) : (
				<div>
					<Box>
						<Content>Your points : {point} </Content>
						<CoinImage />
					</Box>
					<Button onClick={rePlay}>{name}</Button>
				</div>
			)}
		</Layout>
	);
}
const SnakeImage = styled.div`
	background-image: url(${snakeImage});
	background-repeat: no-repeat;
	background-size: cover;
	height: 140px;
	width: 140px;
`;

const CoinImage = styled.div`
	background-image: url(${coinImage});
	background-repeat: no-repeat;
	background-size: cover;
	height: 20px;
	width: 20px;
`;

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: darkslategrey;
`;

const Box = styled.div`
	display: flex;
`;

const Content = styled.span`
	font-size: 1em;
	text-align: center;
	color: darkslategrey;
`;

const Wrapper = styled.section`
	position: relative;
	/* margin: 2rem; */
	height: 30rem;
	width: 30rem;
	margin-bottom: 20px;
	background: papayawhip;
`;

const Button = styled.button`
	/* Adapt the colors based on primary prop */
	color: teal;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid Teal;
	border-radius: 3px;
	float: right;
`;
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);