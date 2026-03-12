export interface Project {
  id: number;
  title: string;
  subject: string;
  description: string;
  deadline: string;
  status: 'À faire' | 'En cours' | 'Terminé';
  priority: 'Basse' | 'Moyenne' | 'Haute';
}