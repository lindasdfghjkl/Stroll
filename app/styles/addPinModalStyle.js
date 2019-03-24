
export default {
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080', // Shadow the view behind the modal
      },
      modal: {
        width: '90%',
        height: '60%',
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
        height: '55%',
        borderColor: '#6EEB93',
        color: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: '3%',
        marginBottom: '5%',
        fontFamily: 'asap-regular',
        fontSize: 20
      },
      postIcon: {
        alignSelf: 'flex-end',
        width: 35,
        height: 38,
        resizeMode: 'contain'
      }
}