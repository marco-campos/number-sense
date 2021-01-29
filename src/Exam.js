import { render } from '@testing-library/react';
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export class Exam extends React.Component {

    render(){


        return(
            <div>
            <table class = "questionsend">
               {this.props.exam.map((question, index) =>(
        <tr >
          <th>
            <BlockMath>{String.raw` ${this.props.exam[index]}`}</BlockMath>
          </th>
          
        </tr>
      ))}
            </table>
            <table class = "answers">
            {this.props.key.map((question, index) =>(
     <tr >
       <th>
         <BlockMath>{String.raw` ${this.props.key[index]}`}</BlockMath>
       </th>
       
     </tr>
   ))}
         </table>
         </div>

            
        )
    }
}
