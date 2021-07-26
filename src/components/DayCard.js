import styled from 'styled-components';

const StyledCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 20px;
	max-width: 150px;
	width: 100%;
	min-height: 150px;
	text-align: center;
	color: darkblue;
	border: 1px solid lightgray;
	opacity: 0.7;
	background-color: lightgray;

	&:hover {
		opacity: 1;
		transform: scale(1.1);
	}
`;

const StyledCardContent = styled.div`
	padding: 30px,
	min-height: 200px;
	cursor: pointer;
`;

const StyledCardContentTitle = styled.p`
	margin: 0;
`;

const StyledCardContentIcon = styled.img`
	width: 50px;
	height: 50px;
`;

const StyledCardContentSubtitle = styled.h3`
	margin: 0;
`;

const StyledCardContentDescription = styled.p`
	margin-top: 15px;
	text-transform: capitalize;
`;

const DayCard = ({ title, icon, subtitle, description }) => {
	return (
		<StyledCard>
			<StyledCardContent>
				<StyledCardContentTitle>{title}</StyledCardContentTitle>
				<StyledCardContentIcon src={icon} />
				<StyledCardContentSubtitle>{subtitle} °C</StyledCardContentSubtitle>
				<StyledCardContentDescription>
					{description}
				</StyledCardContentDescription>
			</StyledCardContent>
		</StyledCard>
	);
};

export default DayCard;
