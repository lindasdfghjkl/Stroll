
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
    lineHeight: 24,
    marginBottom: 15,
  },
  tagsView: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
   // alignSelf:'flex-end',
    left: 0,
  },
  tag: {
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft: 4,
    padding: 4,
    color: 'white',
    fontSize: 14,
    fontFamily: 'asap-regular',
    textAlignVertical: 'center',
    height: 20,
    borderRadius: 3,
  },
  timeView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    color: '#444',
    height: 20,
    width: '100%'
  },
  date: {
   // position: 'absolute',
    height: 20,
    fontFamily: 'asap-regular',
    fontSize: 14,
    color: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  }
}