import React from 'react';

export class KeyPadComponent extends React.Component {

    render() {
        return (
            <div className="button">

                <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
                <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
                <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button><br />

                <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
                <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
                <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button><br />

                <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
                <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
                <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button><br />

                <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
                <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
                <button name="/" onClick={e => this.props.onClick(e.target.name)}>/</button><br />

                <button name="<" onClick={e => this.props.onClick(e.target.name)}>Left</button>
                <button name="_" onClick={e => this.props.onClick(e.target.name)}>_</button>
                <button name=">" onClick={e => this.props.onClick(e.target.name)}>Right</button><br />
                <button name="C" onClick={e => this.props.onClick(e.target.name)}>C</button><br/>

            </div>
        );
    }
}