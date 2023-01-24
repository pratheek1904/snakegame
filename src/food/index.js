import React from 'react';
import styled from 'styled-components';
import coinImage from '../assests/images/coin.gif'


function Food(props) {
	return (
		<FoodItem top={`${props.foodDot[0]}rem`} left={`${props.foodDot[1]}rem`} />
	);
}

const FoodItem = styled.div`
	position: absolute;
	/* background-image: url(${coinImage});
	background-repeat: no-repeat;
	background-size: cover; */
	background: tomato;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	z-index: 1;
	/* border: 2px solid burlywood; */
	top: ${(props) => props.top};
	left: ${(props) => props.left};
`;
export default Food;
