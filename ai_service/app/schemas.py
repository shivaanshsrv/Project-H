from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    rooftop_mask_path: str
    obstruction_mask_path: str
    heatmap_path: str
    panel_count: int
    estimated_energy_watts: float
    panels: list
