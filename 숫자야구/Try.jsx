import React, { PureComponent, memo } from 'react';

const Try = memo(({ value }) => {
    return (
        <li>
            <div>{value.try}</div>
            <div>{value.result}</div>
        </li>
    );
});

// class Try extends PureComponent {
//     render() {
//         const { value } = this.props;
//         return (
//             <li>
//                 <div>{value.try}</div>
//                 <div>{value.result}</div>
//             </li>
//         );
//     }
// }

export default Try;
