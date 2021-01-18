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
import {addToList} from '../../../../store/list/actions'
import RestApi from '../../../../store/service/RestApi';
import {showNotification} from "../../../../store/redux/notificationRedux";

const fields = ['image', 'name', 'coreCount', 'coreClock', 'boostClock', 'graphics', 'smt', 'tdp','price', 'actions'];

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

const CPU = (props) => {
  const dispatch = useDispatch();
  const tag = 'Page::Users';
  const [cpu, setCpu] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [visibleView, setVisibleView] = useState(false);

  const fetchCpu = async () => {
    try {
      let {ok, data} = await props.callApi(RestApi.getCPU);
      if (ok) {
        setCpu(data.cpu);
        setSelectedCPU(data.cpu[0]);
      }
    } catch (e) {
      console.log(tag, 'FETCH_USER_ERROR', e.message)
    }
  };

  const getListProduct = async () => {
    try {
      let products = JSON.parse(sessionStorage.getItem('listItem')) === null
      ? []: JSON.parse(sessionStorage.getItem('listItem'));
      setListProduct(products)
    } catch (e) {
      console.log('Get list products', e.message)
    }
  };

  const toggleView = (val) => {
    setVisibleView(val);
  };

  const onClickView = (cpu) => {
    setSelectedCPU(cpu);
    toggleView(true);
  };

  const onClickAdd = (item) => {
    let newComponent = 'cpu';
    if (listProduct.length === 0) {
        item.component = newComponent;
        listProduct.push(item)
    } else {
        let foundIndex = listProduct.findIndex(x => x.component === newComponent);
        if (foundIndex === -1) {
          item.component = newComponent;
          listProduct.push(item)
        } else {
          item.component = newComponent;
          listProduct[foundIndex] = item;
        }
    }
    sessionStorage.setItem('listItems', JSON.stringify(listProduct));
    dispatch(addToList(listProduct));
    props.history.push('/list')
  };

  useEffect(() => {
    fetchCpu();
    getListProduct()
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {props.isLoading === false ?
            <CCard>
              <CCardHeader>
                CPU
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={cpu}
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
                    'coreCount':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.coreCount}
                          </div>
                        </td>
                      ),
                    'coreClock':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.coreClock}
                          </div>
                        </td>
                      ),
                    'boostClock':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.boostClock}
                          </div>
                        </td>
                      ),
                    'graphics':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.graphics}
                          </div>
                        </td>
                      ),
                    'smt':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.smt}
                          </div>
                        </td>
                      ),
                    'tdp':
                      (item) => (
                        <td className='v-align'>
                          <div className="h6">
                            {item.tdp}
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
      {selectedCPU &&
      <>
        <CModal
          show={visibleView}
          onClose={() => toggleView(false)}
          size="lg"
          color={"info"}
        >
          <CModalHeader closeButton>
            <CModalTitle>{selectedCPU.name}</CModalTitle>
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
                              src={selectedCPU.image}
                              className="c-avatar-img"
                              style={{borderRadius: '0!important'}}
                              alt={selectedCPU.image}
                            />
                          </div>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="text-input">Name</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.name.toString().toUpperCase()}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Core Count</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.coreCount}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Core Clock</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p
                            className="form-control-static">{selectedCPU.coreClock}
                            </p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Boost Clock</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.boostClock}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">TDP</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.tdp}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Integrated Graphics</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.graphics}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">SMT</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.smt}</p>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="6" className="text-left text-lg-right">
                          <CLabel htmlFor="password-input">Price</CLabel>
                        </CCol>
                        <CCol xs="6" >
                          <p className="form-control-static">{selectedCPU.price}</p>
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
)(CPU)
