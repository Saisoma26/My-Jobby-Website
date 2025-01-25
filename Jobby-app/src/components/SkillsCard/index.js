// import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <div className="each-skill">
      <img src={imageUrl} alt="each.name" className="skill-icon" />
      <p className="skill-name">{name}</p>
    </div>
  )
}

export default SkillsCard
