export default function Popup() {
  return (
    <Modal transparent={true}>
      <View
        style={{
          zIndex: 100,
          backgroundColor: "rgba(000, 000, 000, 0.5)",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="test"></Button>
      </View>
    </Modal>
  );
}
