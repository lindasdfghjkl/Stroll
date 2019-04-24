
export default {
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22222240', // Shadow the view behind the modal

      },
      modal: {
        width: '90%',
        minHeight: '20%',
        maxHeight: '100%',
        height: '70%',
        backgroundColor: '#212121',
        paddingLeft: '6%',
        paddingRight: '6%',
        paddingBottom: '6%',
        borderRadius: '10%',
      },
      modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '3%'
      },
      modalTitle: {    
        fontSize: 24,
        color: 'white',
        paddingTop: '3%',
        paddingBottom: '4%',
        fontFamily: 'asap-medium'
      },
      closeIcon: {
        marginLeft: 'auto',
        paddingTop: '3%',
        paddingBottom: '4%'
      },
      titleInput: {
        minHeight: '5%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },
      noteInput: {
        minHeight: '15%',
        height: '40%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },

      buttonsView: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        height: '5%',
        bottom: '5%',
        paddingTop: 5
      },
      postIcon: {
        width: 35,
        height: 38,
        margin: '3%',
      },
      selectImgIcon: {
        width: 25,
        height: 25,
        margin: '3%',  
      },
      cameraIcon: {
        width: 25,
        height: 25,
        margin: '3%',
      },

      imgThumb: {
        width: 50, 
        height: 50,
        resizeMode: 'cover',

      },
      noThumb: {
        width: 0, 
        height: 50,
        resizeMode: 'cover',

      }
}