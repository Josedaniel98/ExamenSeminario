import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/producto/producto';
import ListProducto from './ListProducto';


const ms2p = (state) => {
    return {
        ...state.producto,
    };
};

const md2p = { ...actions };

export const listProducto = connect(ms2p, md2p)(ListProducto);
