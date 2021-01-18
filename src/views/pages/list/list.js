import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux";
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CLink
} from '@coreui/react'
import ApiRedux from '../../../store/redux/apiRedux';
import RestApi from '../../../store/service/RestApi';
import {showNotification} from "../../../store/redux/notificationRedux";

const fields = ['component', 'image', 'selection', 'base', 'tax', 'markup', 'actions'];

const Loading = () => {
  return (
    <div className="d-flex justify-content-center"
         style={{height: '100vh', flexDirection: 'row', alignItems: 'center'}}>
      <div className="spinner-border text-primary" role="status" style={{width: 100, height: 100}}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
};

const List = (props) => {
  const data = useSelector(state => state.List);
  const [productList, setProductList] = useState([]);

  const onClickAdd = (item) => {
    console.log(item)
  };

  useEffect(() => {
    const getListData = () => {
      if (data && data.products.length) {
        setProductList(data.products)
      } else {
        let listItem  = JSON.parse(sessionStorage.getItem('listItems'))
        ? JSON.parse(sessionStorage.getItem('listItems'))
          : [];
        setProductList(listItem);
      }
    };
    getListData();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CRow>
        <CCol xs="12" lg="9">
          {props.isLoading === false ?
            <CCard>
              <CCardHeader>
                List
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={productList}
                  fields={fields}
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    'component' :
                      (item) => (
                        <td className='v-align'>
                          <CLink to={'/products/' + item.component}>
                            <u>
                              {item.component}
                            </u>
                          </CLink>
                        </td>
                      ),
                    'image':
                      (item) => (
                        <td className="text-left v-align">
                          <div className="c-avatar">
                            <img src={item.image} className="c-avatar-img" style={{borderRadius: 'none!important'}} alt="avatar"/>
                          </div>
                        </td>
                      ),
                    'selection':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.name}
                          </div>
                        </td>
                      ),
                    'base':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.price}
                          </div>
                        </td>
                      ),
                    'tax':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            10%
                          </div>
                        </td>
                      ),
                    'markup':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.price}
                          </div>
                        </td>
                      ),
                    'actions':
                      (item) => (
                        <td className='v-align'>
                          <CButton active variant="ghost" color="success" aria-pressed="true" size="sm"
                                   className={"btn-pill"} onClick={() => onClickAdd(item)}>Add</CButton>&nbsp;
                        </td>
                      )

                  }}
                />
              </CCardBody>
            </CCard>
            :
            <Loading/>}
        </CCol>
        <CCol xs="12" lg="3">

        </CCol>
      </CRow>

    </>
  )
};

export default connect(
  (state) => ({
    isLoading: state.loadingIndicator.counter === 1,
  }),
  (dispatch) => ({
    // callApi: (method, ...args) => new Promise((resolve, reject) => {
    //   dispatch(ApiRedux.callApi(method, resolve, ...args), reject)
    // }),
    // callApi2: (method, callback, ...args) => dispatch(ApiRedux.callApi(method, callback, ...args)),
    toast: (type, message) => dispatch(showNotification(type, message))
  })
)(List)
