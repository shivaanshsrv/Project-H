from pydantic import BaseModel
from typing import Optional, List, Dict

class AnalysisOut(BaseModel):
    id: str
    panel_count: Optional[int]
    estimated_energy: Optional[float]
    rooftop_mask: Optional[str]
    obstruction_mask: Optional[str]
    heatmap: Optional[str]
