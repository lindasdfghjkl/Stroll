
export default {
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 275,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fefefe',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#fefefe',
    borderWidth: 0.5,

  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: '#fefefe',
    borderWidth: 16,
    borderColor: '#fefefe',
    borderTopColor: '#fefefe',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: '#fefefe',
    borderWidth: 16,
    borderColor: '#fefefe',
    borderTopColor: '#fefefe',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  title: {
    fontFamily: 'asap-bold',
    fontSize: 24,
    textAlign: 'center'
  },
  message: {
    paddingTop: 5,
    fontFamily: 'asap-regular',
    fontSize: 20,
    textAlignVertical: 'center',
    color: '#222',
    lineHeight: 24

  },
  date: {
    position:'absolute',
    bottom:5,
    alignSelf:'flex-end',
    fontFamily: 'asap-regular',
    fontSize: 14,
    textAlignVertical: 'center',
    color: '#444'
  }
}