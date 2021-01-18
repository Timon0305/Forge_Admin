import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from "react-redux";
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CLabel,
  CImg,
} from '@coreui/react'
import ApiRedux from '../../../../store/redux/apiRedux';
import {addToList} from '../../../../store/list/actions';
import RestApi from '../../../../store/service/RestApi';
import {showNotification} from "../../../../store/redux/notificationRedux";

const fields = ['image', 'name', 'capacity', 'gbprice', 'type', 'cache', 'factor', 'interface' ,'price', 'actions'];

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

const Storage = (props) => {
  const dispatch = useDispatch();
  const tag = 'Page::Users';
  const [storage, setStorage] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [visibleView, setVisibleView] = useState(false);

  const fetchStorage = async () => {
    try {
      let {ok, data} = await props.callApi(RestApi.getStorage);
      if (ok) {
        setStorage(data.storage);
        setSelectedStorage(data.storage[0]);
      }
    } catch (e) {
      console.log(tag, 'FETCH_USER_ERROR', e.message)
    }
  };
  const getListProduct = () => {
    let product = JSON.parse(sessionStorage.getItem('listItems')) === null
      ? [] :
      JSON.parse(sessionStorage.getItem('listItems'));
    setListProduct(product);
  };


  const toggleView = (val) => {
    setVisibleView(val);
  };

  const onClickView = (cpu) => {
    setSelectedStorage(cpu);
    toggleView(true);
  };

  const onClickAdd = (item) => {
    const newComponent = 'storage';
    for (let i = 0 ; i < listProduct.length; i ++) {
      listProduct[i].key = i;
    }
    item.component = newComponent;
    listProduct.push(item);
    sessionStorage.setItem('listItems', JSON.stringify(listProduct));
    dispatch(addToList(listProduct));
    props.history.push('/list')
  };

  useEffect(() => {
    fetchStorage();
    getListProduct()
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {props.isLoading === false ?
            <CCard>
              <CCardHeader>
                Storage
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={storage}
                  fields={fields}
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    'image':
                      (item) => (
                        <td className="text-left v-align">
                          <div className="c-avatar">
                            <img src={item.image} className="c-avatar-img" style={{borderRadius: 'none!important'}} alt="avatar"/>
                          </div>
                        </td>
                      ),
                    'name':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.name}
                          </div>
                        </td>
                      ),
                    'capacity':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.capacity}
                          </div>
                        </td>
                      ),
                    'gbprice':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.gbprice}
                          </div>
                        </td>
                      ),
                    'type':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.type}
                          </div>
                        </td>
                      ),
                    'cache':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.cache}
                          </div>
                        </td>
                      ),
                    'factor':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.factor}
                          </div>
                        </td>
                      ),
                    'interface':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.interface}
                          </div>
                        </td>
                      ),
                    'price':
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
                          <CButton active variant="ghost" color="info" aria-pressed="true" size="sm"
                                   className={"btn-pill"} onClick={() => onClickView(item)}>View</CButton>&nbsp;
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
      </CRow>
      {selectedStorage &&
      <>
        <CModal
          show={visibleView}
          onClose={() => toggleView(false)}
          size="lg"
          color={"info"}
        >
          <CModalHeader closeButton>
            <CModalTitle>{selectedStorage.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12" md="12">
                <CCard>
                  <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <div style={{width: 200, height: 200, margin: 'auto'}}>
                            <CImg
                              src={selectedStorage.image}
                              className="c-avatar-img"
                              style={{borderRadius: '0!important'}}
                              alt={selectedStorage.image}
                            />
                          </div>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="text-input">Name</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.name.toString().toUpperCase()}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Capacity</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.coreCount}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price/GB</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p
                            className="form-control-static">{selectedStorage.gbprice}
                            </p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Type</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.type}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Cache</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.cache}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Form Factor</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.factor}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Interface</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.interface}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedStorage.price}</p>
                        </CCol>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="info" onClick={() => toggleView(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </>}

    </>
  )
};

export default connect(
  (state) => ({
    isLoading: state.loadingIndicator.counter === 1,
  }),
  (dispatch) => ({
    callApi: (method, ...args) => new Promise((resolve, reject) => {
      dispatch(ApiRedux.callApi(method, resolve, ...args), reject)
    }),
    callApi2: (method, callback, ...args) => dispatch(ApiRedux.callApi(method, callback, ...args)),
    toast: (type, message) => dispatch(showNotification(type, message))
  })
)(Storage)
