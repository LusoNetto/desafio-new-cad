import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${(props) => `${props.color}`};
  font-weight: 600;
  width: 100%;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  margin-top: 1rem;
`
