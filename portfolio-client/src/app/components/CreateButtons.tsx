import AddButton from "@/components/addButton"

const CreateButtons = () => {
  return (
    <>
      <AddButton link={'/create-message'} icon={'/messageIcon.svg'} title={'Create article'} left={25} bottom={155}/>
      <AddButton link={'/create-project'} icon={'/projectIcon.svg'} title={'Create project'} left={25} bottom={90}/>
    </>
  )
}

export default CreateButtons;