import { render } from '@testing-library/react';
import React from 'react';

export class Exam extends React.Component {
    render(){

        return(
            <table class="center">
                {Object.keys(this.props.exam).map((question, index) =>(
                <tr key ={index}>
                <th>
                    <BlockMath>{String.raw` ${Object.keys(this.props.exam)[index]}`}</BlockMath>
                </th>
                <th>
                    <BlockMath>{String.raw` ${Object.values(this.props.exam)[index]}`}</BlockMath>
                </th>
        </tr>
      ))}
      </table>
        )
    }
}