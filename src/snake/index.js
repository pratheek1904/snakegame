import React from 'react';
import styled from 'styled-components';


function Snake(props) {
	return props.snakeDots.map((snakeDot, i) => (
		<SnakeItem key={i} top={`${snakeDot[0]}rem`} left={`${snakeDot[1]}rem`} />
	));
}


const SnakeItem = styled.div`
	position: absolute;
	height: 2rem;
	width: 2rem;
	border-radius: 10px;
	background: mediumseagreen;
	/* border-radius: 10%; */
	/* border: 1px solid burlywood; */
	z-index: 2;
	/* ([[0, 0], [0, 2], [0, 4], [0, 6]]) */
	top: ${(props) => props.top};
	left: ${(props) => props.left};
`;

export default Snake;
