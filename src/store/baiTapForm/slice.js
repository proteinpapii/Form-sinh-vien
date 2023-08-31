import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sinhVienList: [],
    sinhVienEdit:  undefined,
}

const baiTapFormSlice = createSlice({
    name: 'baiTapForm',
    initialState,
    reducers: {
        addSinhVien: (state, { payload }) => {
            state.sinhVienList.push(payload)
        },
        deleteSinhVien: (state, { payload }) => {
            state.sinhVienList = state.sinhVienList.filter((prd) => prd.maSV !== payload)
        },
        editSinhVien: (state, { payload }) => {
            state.sinhVienEdit = payload
        },
        updateSinhVien: (state, { payload }) => {
            state.sinhVienList = state.sinhVienList.map((prd) => {
                if (prd.maSV === payload.maSV) {
                    return payload
                }
                return prd
            })
            state.sinhVienEdit = undefined
        },
    },
})

export const { reducer: baiTapFormReducer, actions: baiTapFormActions } = baiTapFormSlice
