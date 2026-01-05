import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts, createContact, updateContact, deleteContact } from "@/api/contacts";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactManagement() {
  const { isAuthenticated, user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    order: 0
  });

  const queryClient = useQueryClient();

  const { data: contactsData, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const data = await getContacts({ sort: "-created_at" });
      return data.contacts || data || [];
    },
    enabled: isAuthenticated && user?.role === "admin",
    onError: (error) => {
      if (error.response?.status === 401) {
        // Silent fail - user not authenticated or not admin
        return;
      }
      console.error("Failed to load contacts:", error);
      toast.error("Холбоо барих мэдээлэл татахад алдаа гарлаа");
    },
  });

  const contacts = contactsData || [];

  const createMutation = useMutation({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Холбоо барих мэдээлэл нэмэгдлээ");
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Холбоо барих мэдээлэл шинэчлэгдлээ");
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Холбоо барих мэдээлэл устгагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      order: 0
    });
    setEditingContact(null);
    setDialogOpen(false);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || "",
      phone: contact.phone || "",
      email: contact.email || "",
      address: contact.address || "",
      order: contact.order || 0
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Нэр оруулна уу");
      return;
    }

    if (editingContact) {
      updateMutation.mutate({ id: editingContact.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Холбоо барих мэдээлэл
          </CardTitle>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Нэмэх
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-slate-500 py-8">Ачааллаж байна...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Мэдээлэл олдсонгүй</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                    {contact.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </div>
                    )}
                    {contact.address && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {contact.address}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(contact)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("Устгахдаа итгэлтэй байна уу?")) {
                        deleteMutation.mutate(contact.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? "Мэдээлэл засах" : "Мэдээлэл нэмэх"}
            </DialogTitle>
            <DialogDescription>
              {editingContact ? "Холбоо барих мэдээллийг засах" : "Шинэ холбоо барих мэдээлэл нэмэх"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Нэр *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Нэр"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Утас</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+976 12345678"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Хаяг</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Хаяг"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Эрэмбэ</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Цуцлах
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {editingContact ? "Хадгалах" : "Нэмэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
