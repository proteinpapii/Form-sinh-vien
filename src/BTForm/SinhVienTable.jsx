import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../store/baiTapForm/slice';

const SinhVienTable = () => {
    const { sinhVienList } = useSelector((state) => state.baiTapForm)
    

    const dispatch = useDispatch()

    return (
        <div>
            <table className="table mt-5">
                <thead className='table-dark'>
                    <tr>
                        <th>Mã SV</th>                      
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>                        
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sinhVienList.map((prd) => (
                            <tr key={prd?.maSV}>
                                <td>{prd?.maSV}</td>                              
                                <td>{prd?.name}</td>
                                <td>{prd?.sdt}</td>
                                <td>{prd?.email}</td>
                                <td>
                                    <div className='d-flex gap-3'>
                                        <button
                                            className='btn btn-success'
                                            onClick={() => {
                                                dispatch(baiTapFormActions.editSinhVien(prd))
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => {
                                                dispatch(baiTapFormActions.deleteSinhVien(prd.maSV))
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default SinhVienTable