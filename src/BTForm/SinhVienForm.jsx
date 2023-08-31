import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../store/baiTapForm/slice'

const SinhVienForm = () => {
    const [formValue, setFormValue] = useState()
    const [formError, setFormError] = useState()

    const { sinhVienEdit } = useSelector((state) => state.baiTapForm)

    const dispatch = useDispatch()


    const validate = (element) => {
        const { validity, minLength, title, value } = element

        const { valueMissing, tooShort, patternMismatch } = validity

        let mess = ''

        if (valueMissing) {
            mess = `Vui lòng nhập ${title}`
        } else if (tooShort || value.length < minLength) {
            mess = `Vui lòng nhập ${title} tối thiểu ${minLength} ký tự`
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng ${title}`
        }
        return mess
    }

    const handleFormValue = () => (ev) => {
        const { name, value } = ev.target
        let mess = validate(ev.target)


        setFormError({
            ...formError,
            [name]: mess,
        })

        setFormValue({
            ...formValue,
            [name]: value,
        })
    }

    useEffect(() => {
        if (sinhVienEdit) {
            setFormValue(sinhVienEdit)
        }
    }, [sinhVienEdit])

    return (
        <div>

            <form
                noValidate
                onSubmit={(ev) => {
                    // Ngăn chặn sự kiện reload của browser khi submit form
                    ev.preventDefault()

                    const elements = document.querySelectorAll('input')

                    let errors = {}
                    elements.forEach((ele) => {
                        const { name } = ele
                        errors[name] = validate(ele)
                        setFormError(errors)
                    })


                    let isFlag = false

                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true
                            break
                        }
                    }

                    if (isFlag) return


                    if (!sinhVienEdit) {
                        //submit creat product
                        dispatch(baiTapFormActions.addSinhVien(formValue))

                    } else {
                        //update product
                        dispatch(baiTapFormActions.updateSinhVien(formValue))
                    }
                }}
            >
                <h2 className="p-4 bg-dark text-white">Thông tin sinh viên</h2>

                <div className="mt-3 row">
                    <div className="col-6">
                        <p>Mã SV</p>
                        <input
                            type="text"
                            className="form-control"
                            name="maSV"
                            title="Mã SV"
                            disabled={!!sinhVienEdit}
                            value={formValue?.maSV || ''}
                            required
                            minLength={5}
                            maxLength={20}
                            onChange={handleFormValue()}
                        />
                        {formError?.maSV && <p className="text-danger">{formError?.maSV}</p>}
                    </div>

                    <div className="col-6">
                        <p>Họ tên</p>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            title="Họ tên"
                            value={formValue?.name || ''}
                            onChange={handleFormValue()}
                            required
                            minLength={10}
                        />
                        {formError?.name && <p className="text-danger">{formError?.name}</p>}
                    </div>

                    <div className="col-6">
                        <p>Số điện thoại</p>
                        <input
                            type="text"
                            className="form-control"
                            name="sdt"
                            title="Sđt"
                            value={formValue?.sdt || ''}
                            onChange={handleFormValue()}
                            required
                            pattern="^[0-9]+$"
                        />
                        {formError?.sdt && <p className="text-danger">{formError?.sdt}</p>}
                    </div>

                    <div className="col-6">
                        <p>Email</p>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            title="Email"
                            value={formValue?.email || ''}
                            onChange={handleFormValue()}
                            required
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        />
                        {formError?.email && <p className="text-danger">{formError?.email}</p>}
                    </div>
                </div>

                <div className="mt-3 d-flex gap-3">
                    {
                        sinhVienEdit ? (
                            <button className="btn btn-info">Update</button>
                    ) : (
                            <button className="btn btn-success">Create</button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SinhVienForm
